
var express = require("express");
var app = express();
var bodyparser = require('body-parser');
var oracledb = require('oracledb');
const { sign } = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const fileInputName = "/home/eduardo/Escritorio/ArchivosVacas/MIA_Proyecto2/prueba.csv";
let csvToJson = require('convert-csv-to-json');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
//Configuarcion de Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//Configuracion de correo electronico de donde se envian los correos de verificacion
const emailService = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "proyectop959@gmail.com",
        secure: false,
        pass: "PROYECTOMIA2"
        //proyectomia2
    }
}) 
//Configuracion de la base de datos
var connAttrs = {
    "user": "DBP2",
    "password": "1234",
    "connectString": "localhost:1521/ORCL18"
}
//Metodo post para el login de la aplicacion
app.post('/login', async (req, res) => {
    let body = req.body
    let result = await login(body)
    if (result.ok) {
        //res.send('confirmado!!')
        return res.status(200).send(result)
    } else {
        if (result.err) {
            // Error imprevisto
            return res.status(500).send(result)
        } else {
            // Usuario o contraseña inválidos
            //res.send('usuario o contra incoicas incorrectas')
            return res.status(result.status).send({ ok: false })
        }
    }
})
//Medodo post para registrar nuevos usuarios de tipo CLIENTE.
app.post('/registrar',async (req,res) =>{
    let body = req.body;
    let result = await create(body)
    if (result.ok) {
        
        // Envía el correo de confirmación
        const baseUrl = `http://localhost:4200/Verificacion/${result.id}`
        const data = {
            from: "Eduardo Catalán",
            to: "marvineduardocv12@gmail.com",
            subject: "Activación de cuenta",
            text: `Link de activación ${baseUrl}`,
            html: `<p>Link de activación <strong><a href="${baseUrl}">Verificar cuenta</a></strong></p>`
        }
        emailService.sendMail(data, (err, inf) => {
            if (err) {
                console.log(err)
            } else {
                console.log(inf)
            }
        })
        return res.status(200).send({ ok: true })
    } else {
        if (result.err.errorNum == 1) {
            // Correo duplicado
            return res.status(422).send(result)
        }
        // Error imprevisto
        return res.status(500).send(result)
    }
})
//Metodo get para actualizar el estado de la cuenta a confirmado desde correo electronico
app.get('/EstadoCuenta/:id', async (req, res) => {
    const id = req.params.id
    const result = await confirm(id)
    if (result.ok) {
        return res.status(200).send(result)
    }
    return res.status(500).send(result)
})
//Metodo post para hacer actualizacion de contrasena olvidada
app.post('/RestablecerContra', async (req, res)=> {
    const body = req.body
    const result = await RestablecerContrasenia(body)
    if (!result.ok) {
        return res.status(500).send({ok: false})
    }
    const baseUrl= `http://localhost:4200/login`
    const data = {
        from: "Eduardo Catalán",
        to: "marvineduardocv12@gmail.com",
        subject: "Recuperación de contraseña ",
        text: `Recuperación de contraseña ${baseUrl}`,
        html: `<p>Recuperación de contraseña Contraseña Nueva Provisional:PWD$12345$pwd <strong><a href="${baseUrl}">Verificar cuenta</a></strong></p>`
    }
    emailService.sendMail(data, (err, inf) => {
        if (err) {
            console.log(err)
        } else {
            console.log(inf)
        }
    })
    return res.status(200).send({ ok: true })
})
//funciones.
//Funcion para el login
async function login(req) {
    let con, result
    // consulta a ejecutar
    const query = "SELECT usuarios.ID, usuarios.CONTRA,usuarios.EsAdmin,usuarios.Confirmado" +
        " FROM DBP2.USUARIOS " +
        " WHERE usuarios.EMAIL = :email"
    // datos a insertar
    const binds = [req.email]
    try {
        con = await oracledb.getConnection(connAttrs);
        result = await con.execute(query, binds, { autoCommit: true, maxRows: 1 })
    } catch (err) {
        console.error(err)
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    if (result.rows.length == 1) {
        let confirmado = result.rows[0][3]
        let pwd = result.rows[0][1];
        
        if(confirmado==1){
            if (pwd==req.pwd) {
                let id = result.rows[0][0]
                let esAdmin = result.rows[0][2]
                let token = sign({ id, esAdmin },
                    'seed-de-dessarollo-miap2',
                    { expiresIn: '48h' })
                // Credenciales correctas y correo confirmado
                return { ok: true,token,esAdmin}
            }
        }else{
            // Usuario aún no está confirmado
            return { ok: false, status: 403 }
        }        
    }
    // Correo o contraseña incorrecta
    return { ok: false, status: 401 }
}
//Funcion para la creacion de usuarios e insersion en la base de datos 
async function create(req){
    let con, result
    // consulta a ejecutar
    const insert_query = "INSERT INTO DBP2.USUARIOS(NOMBRE, APELLIDO, PAIS, fecha_nacimiento," +
        "email, CONTRA, fotografia,direccion,fecha_registro,telefono) VALUES(" +
        ":nom, :ape, :pai, TO_DATE(:fec,'yyyy-mm-dd')," +
        ":email, :pwd, :ft, :direccion,:creacion,:telefono)"
    const select_query = "SELECT id FROM DBP2.USUARIOS where email = :email"
    // datos a insertar
    const binds = [req.nombre, req.apellido, req.pais,
    req.fecha, req.email, req.pwd, req.foto,req.direccion, new Date(),req.telefono]
    console.log(binds);
    try {
        con = await oracledb.getConnection(connAttrs)
        await con.execute(insert_query, binds, { autoCommit: true })
        result = await con.execute(select_query, [req.email])
    } catch (err) {
        console.error(err)
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    return { ok: true, id: result.rows[0][0] }
}
//Funcion para actualizacion de campo confirmado en la base de datos.
async function confirm(id) {
    let con, result
    const query = "UPDATE DBP2.USUARIOS set confirmado = 1 WHERE id = :id"
    try {
        con = await oracledb.getConnection(connAttrs)
        result = await con.execute(query, [id], { autoCommit: true })
    } catch (err) {
        console.log(`en confirmar -> ${err}`);
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    return { ok: true, result: result.rowsAffected }
}
//Funcion para recuperacion de contrasenia por medio de correo
async function RestablecerContrasenia(req) {
    let con, result
    const query = "UPDATE DBP2.USUARIOS set contra=:pwd WHERE email = :email "
    const select_query = "SELECT id FROM DBP2.USUARIOS where email = :email"
    const binds = [req.pwd,req.email]
    try {
        con = await oracledb.getConnection(connAttrs)
        await con.execute(query, binds, { autoCommit: true})
        result = await con.execute(select_query, [req.email])
    } catch (err) {
        console.error(err)
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    console.log(result.rows)
    if (result.rows.length >= 1) {
        
        return {
            ok: true
        }
    }
    return { ok: false }
}

//createUsuarios(fileInputName);
//Estadios Terminado
async function LlenarEstadios(ruta){
    let json = csvToJson.fieldDelimiter(',').formatValueByType().latin1Encoding().getJsonFromCsv(ruta);
    console.log(json);
    for (let i=0;i<json.length;i++){
       const insert_query = "INSERT INTO DBP2.ESTADIOS(PAIS,NOMBRE,FECHA_ING,CAPACIDAD,DIRECCION,ESTADO)" +
       "VALUES(:pais,:nombre,TO_DATE(:fec,'DD-MM-YYY'),:capacidad,:direccion:estado)"
        const estadio ={
            pais:json[i].Pais,
            nombre:json[i].Nombre,
            fecha:json[i].Fecha_ing,
            capacidad:json[i].Capacidad,
            direccion:json[i].Direccion,
            estado:json[i].Estado
        }
        const binds = [estadio.pais,estadio.nombre,estadio.fecha,estadio.capacidad,estadio.direccion,estadio.estado]
        try {
            con = await oracledb.getConnection(connAttrs)
            await con.execute(insert_query, binds, { autoCommit: true })
        } catch (err) {
            console.error(err)
            return { ok: false, err }
        } finally {
            if (con) {
                con.release((err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        }
    }
    return { ok: true} 
}
//Equipo terminado.
async function LlenarEquipo(ruta){
    let json = csvToJson.fieldDelimiter(',').formatValueByType().latin1Encoding().getJsonFromCsv(ruta);
    console.log(json);
    for (let i=0;i<json.length;i++){
       const insert_query = "INSERT INTO DBP2.EQUIPO(NOMBRE,FECHA_FUN,PAIS)" +
       "VALUES(:nombre,TO_DATE(:fec,'DD-MM-YYY'),:pais)"
        const estadio ={
            nombre:json[i].Nombre,
            fecha:json[i].Fecha_Fun,
            pais:json[i].Pais
        }
        const binds = [estadio.nombre,estadio.fecha,estadio.pais]
        try {
            con = await oracledb.getConnection(connAttrs)
            await con.execute(insert_query, binds, { autoCommit: true })
        } catch (err) {
            console.error(err)
            return { ok: false, err }
        } finally {
            if (con) {
                con.release((err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        }
    }
    return { ok: true} 
}



//PENDIENTE POR LA RELACION CON LA TABLA EQUIPO, PENDIENTE JUGADOR POR SUS DIFERENTES RELACIONES,PENDIENTE COMPETICION POR SUS RELACIONE
async function LlenarDirectores(ruta){
    let json = csvToJson.fieldDelimiter(',').formatValueByType().latin1Encoding().getJsonFromCsv(ruta);
    console.log(json);
    for (let i=0;i<json.length;i++){
       const insert_query = "INSERT INTO DBP2.ESTADIOS(NOMBRES,FECHA_NAC,PAIS,ESTADO,PAIS_EQUIPO,EQUIPO,FECHA_INI,FECHA_FIN)" +
       "VALUES(:pais,:nombre,TO_DATE(:fec,'DD-MM-YYY'),:capacidad,:direccion:estado)"
        const estadio ={
            pais:json[i].Pais,
            nombre:json[i].Nombre,
            fecha:json[i].Fecha_ing,
            capacidad:json[i].Capacidad,
            direccion:json[i].Direccion,
            estado:json[i].Estado
        }
        const binds = [estadio.pais,estadio.nombre,estadio.fecha,estadio.capacidad,estadio.direccion,estadio.estado]
        try {
            con = await oracledb.getConnection(connAttrs)
            await con.execute(insert_query, binds, { autoCommit: true })
        } catch (err) {
            console.error(err)
            return { ok: false, err }
        } finally {
            if (con) {
                con.release((err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        }
    }
    return { ok: true} 
}
async function createUsuarios(ruta){
    let json = csvToJson.fieldDelimiter(',').formatValueByType().latin1Encoding().getJsonFromCsv(ruta);
    console.log(json);
    let con, result
    for(let i=0; i<json.length;i++){
        //console.log(json[i].NOMBRE);
        // consulta a ejecutar
    const insert_query = "INSERT INTO DBP2.USUARIOS(NOMBRE, APELLIDO, PAIS, fecha_nacimiento," +
    "email, CONTRA, fotografia,direccion,fecha_registro,telefono) VALUES(" +
    ":nom, :ape, :pai, TO_DATE(:fec,'DD-MM-YYYY')," +
    ":email, :pwd, :ft, :direccion,:creacion,:telefono)"
    const select_query = "SELECT id FROM DBP2.USUARIOS where email = :email"
    // datos a insertar
    const usr ={
        nombre: json[i].NOMBRE, 
        apellido:json[i].APELLIDO,
        pais:json[i].PAIS,
        fecha:json[i].fecha_nacimiento, 
        email:json[i].email,
        pwd:json[i].CONTRA,
        foto:json[i].fotografia,
        direccion:json[i].direccion,
        telefono:json[i].telefono
    }
    const binds = [usr.nombre, usr.apellido,usr.pais,usr.fecha, usr.email,usr.pwd,usr.foto,usr.direccion, new Date(),usr.telefono]
    try {
        con = await oracledb.getConnection(connAttrs)
        await con.execute(insert_query, binds, { autoCommit: true })
    } catch (err) {
        console.error(err)
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    }
    return { ok: true}
}







//Prueba de consulta.
app.get('/prueba', function (req, res) {    
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("SELECT * FROM DBP2.USUARIOS", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});
app.listen(4015,'localhost',function(){
    console.log("el servidor esta escuchando desde el puerto 4015 pa :D")
})


