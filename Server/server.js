var express = require("express");
var app = express();
var bodyparser = require('body-parser');
var oracledb = require('oracledb');
const { sign } = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const fileInputName = "/home/eduardo/Escritorio/ArchivosVacas/MIA_Proyecto2/prueba.csv";
let csvToJson = require('convert-csv-to-json');
let idActual;
let idActualEmpleado = 1;
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
    let resultid = await ReturnIdUser(body.email);
    idActual = resultid;
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
app.post('/login-empleado', async (req, res) => {
    let body = req.body
    let result = await loginEmpleado(body)
    let resultid = await ReturnIdUserEmpleado(body.email);
    idActual = resultid;
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
app.post('/registrar-admin',async (req,res) =>{
    let body = req.body;
    let result = await createAdmin(body)
    if (result.ok) {
        
        // Envía el correo de confirmación
        const baseUrl = `http://localhost:4200/login`
        const data = {
            from: "Eduardo Catalán",
            to: "marvineduardocv12@gmail.com",
            subject: "Credenciales de Administrador/Empleado",
            text: `Bienvenido ${baseUrl}`,
            html: `<p>Tu correo es: ${body.email} y tu contrasenia es: ${body.pwd} <strong><a href="${baseUrl}">Iniciar Sesion</a></strong></p>`
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

app.post('/registrar-empleado',async (req,res) =>{
    let body = req.body;
    let result = await createEmpleado(body)
    if (result.ok) {
        
        // Envía el correo de confirmación
        const baseUrl = `http://localhost:4200/login`
        const data = {
            from: "Eduardo Catalán",
            to: "marvineduardocv12@gmail.com",
            subject: "Credenciales de Administrador/Empleado",
            text: `Bienvenido ${baseUrl}`,
            html: `<p>Tu correo es: ${body.email} y tu contrasenia es: ${body.pwd} <strong><a href="${baseUrl}">Iniciar Sesion</a></strong></p>`
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

/*
POSTS para realizar la carga masiva!!
*/
app.post('/carga-estadios',async(req,res)=>{
    body = req.body
    const resultado = await LlenarEstadios(body.ruta);
    if(!resultado.ok){
        return res.status(422).send({ok: false})
    }else{
        return res.status(200).send({ok:true})
    }
    
})
app.post('/carga-equipos',async(req,res)=>{
    body = req.body
    const resultado = await LlenarEquipo(body.ruta);
    if(!resultado.ok){
        return res.status(500).send({ok: false})
    }else{
        return res.status(200).send({ok:true})
    }
    
})
app.post('/carga-directores',async(req,res)=>{
    body = req.body
    const resultado = await LlenarDirectores(body.ruta);
    if(!resultado.ok){
        return res.status(500).send({ok: false})
    }else{
        return res.status(200).send({ok:true})
    }
    
})
app.post('/carga-jugadores',async(req,res)=>{
    body = req.body
    const resultado = await LlenarJugadores(body.ruta);
    if(!resultado.ok){
        return res.status(500).send({ok: false})
    }else{
        return res.status(200).send({ok:true})
    }
    
})
app.post('/carga-competicion',async(req,res)=>{
    body = req.body
    const resultado = await LlenarCompeticion(body.ruta);
    if(!resultado.ok){
        return res.status(500).send({ok: false})
    }else{
        return res.status(200).send({ok:true})
    }
    
})
app.post('/carga-partidos-incidencias',async(req,res)=>{
    body = req.body
    const resultado = await LlenarPartidosIncidencias(body.ruta);
    if(!resultado.ok){
        return res.status(500).send({ok: false})
    }else{
        return res.status(200).send({ok:true})
    }
    
})
app.get('/consultar-equipos',async(req,res)=>{
    const result = await consultaEquipos()
    if(result.ok){
        return res.status(200).send(result)
    }
    return res.status(500).send(result)
})
app.post('/suscribirse',async(req,res)=>{
    result = await Suscribirse(req.body)
    if(result.ok){
        return res.status(200).send(result)
    }
    return res.status(500).send(result)

})
app.post('/membresia',async(req,res)=>{
    result = await ComprarMembresia()
    if(result.ok){
        return res.status(200).send(result)
    }
    return res.status(500).send(result)
})
app.post('/noticias',async(req,res)=>{
    result = await AddNoticia(req.body)
    if(result.ok){
        return res.status(200).send(result)
    }
    return res.status(500).send(result)
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

async function loginEmpleado(req) {
    let con, result
    // consulta a ejecutar
    const query = "SELECT EMPLEADOS.ID_EMPLEADO, empleados.CONTRA" +
        " FROM DBP2.EMPLEADOS " +
        " WHERE EMPLEADOS.EMAIL = :email"
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
            if (pwd==req.pwd) {
                let id = result.rows[0][0]
                // Credenciales correctas y correo confirmado
                return { ok: true}
            }
               
    }
    // Correo o contraseña incorrecta
    return { ok: false, status: 401 }
}

//aa
async function createAdmin(req){
    let con, result
    // consulta a ejecutar
    const insert_query = "INSERT INTO DBP2.USUARIOS(NOMBRE, APELLIDO, PAIS, fecha_nacimiento," +
        "email, CONTRA, fotografia,direccion,fecha_registro,telefono,GENERO,EsAdmin,Confirmado,TIPO_MEMBRECIA) VALUES(" +
        ":nom, :ape, :pai, TO_DATE(:fec,'yyyy-mm-dd')," +
        ":email, :pwd, :ft, :direccion,:creacion,:telefono,:genero,1,1,'NA')"
    const select_query = "SELECT id FROM DBP2.USUARIOS where email = :email"
    // datos a insertar
    const binds = [req.nombre, req.apellido, req.pais,
    req.fecha, req.email, req.pwd, req.foto,req.direccion, new Date(),req.telefono,req.genero]
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

async function createEmpleado(req){
    let con, result
    // consulta a ejecutar
    const insert_query = "INSERT INTO DBP2.EMPLEADOS(NOMBRE, APELLIDO, EMAIL,CONTRA)" +
    `VALUES('${req.nombre}','${req.apellido}','${req.email}','${req.pwd}')`
    try {
        con = await oracledb.getConnection(connAttrs)
        await con.execute(insert_query,[], { autoCommit: true })
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
    return { ok: true}
}
//Funcion para la creacion de usuarios e insersion en la base de datos 
async function create(req){
    let con, result
    // consulta a ejecutar
    const insert_query = "INSERT INTO DBP2.USUARIOS(NOMBRE, APELLIDO, PAIS, fecha_nacimiento," +
        "email, CONTRA, fotografia,direccion,fecha_registro,telefono,GENERO) VALUES(" +
        ":nom, :ape, :pai, TO_DATE(:fec,'yyyy-mm-dd')," +
        ":email, :pwd, :ft, :direccion,:creacion,:telefono,:genero)"
    const select_query = "SELECT id FROM DBP2.USUARIOS where email = :email"
    // datos a insertar
    const binds = [req.nombre, req.apellido, req.pais,
    req.fecha, req.email, req.pwd, req.foto,req.direccion, new Date(),req.telefono,req.genero]
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

//LlenarEstadios('/home/eduardo/Escritorio/ArchivosVacas/MIA_Proyecto2/ArchivosEntrada/Estadios.csv');
//LlenarEquipo('/home/eduardo/Escritorio/ArchivosVacas/MIA_Proyecto2/ArchivosEntrada/Equipos.csv');
//LlenarDirectores('/home/eduardo/Escritorio/ArchivosVacas/MIA_Proyecto2/ArchivosEntrada/DTS.csv');
//LlenarJugadores('/home/eduardo/Escritorio/ArchivosVacas/MIA_Proyecto2/ArchivosEntrada/Jugadores.csv')
//LlenarCompeticion('/home/eduardo/Escritorio/ArchivosVacas/MIA_Proyecto2/ArchivosEntrada/Competicion.csv')
//LlenarPartidosIncidencias('/home/eduardo/Escritorio/ArchivosVacas/MIA_Proyecto2/ArchivosEntrada/PartidosIncidencias.csv')


async function LlenarEstadios(ruta){
    let json = csvToJson.fieldDelimiter(',').formatValueByType().latin1Encoding().getJsonFromCsv(ruta);
    console.log(json);
    for (let i=0;i<json.length;i++){
       const insert_query = "INSERT INTO DBP2.ESTADIOS(PAIS,NOMBRE,FECHA_ING,CAPACIDAD,DIRECCION,ESTADO)" +
       "VALUES(:PAIS,:NOMBRE,TO_DATE(:FECHA_ING,'DD-MM-YYYY'),:CAPACIDAD,:DIRECCION:ESTADO)"
        const estadio ={
            pais:json[i].Pais,
            nombre:json[i].Nombre,
            fecha:json[i].Fecha_ing,
            capacidad:json[i].Capacidad,
            direccion:json[i].Direccion,
            estado:json[i].Estado
        }
        const binds = [estadio.pais,estadio.nombre,estadio.fecha,estadio.capacidad,estadio.direccion,estadio.estado]
        const query = "INSERT INTO DBP2.ESTADIOS(PAIS,NOMBRE,FECHA_ING,CAPACIDAD,DIRECCION,ESTADO)"+
        `VALUES('${estadio.pais}','${estadio.nombre}',TO_DATE('${estadio.fecha}','DD-MM-YYYY'),'${estadio.capacidad}','${estadio.direccion}','${estadio.estado}')`
        try {
            con = await oracledb.getConnection(connAttrs)
            await con.execute(query, [], { autoCommit: true })
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

async function LlenarEquipo(ruta){
    let json = csvToJson.fieldDelimiter(',').formatValueByType().latin1Encoding().getJsonFromCsv(ruta);
    console.log(json);
    for (let i=0;i<json.length;i++){
       const insert_query = "INSERT INTO DBP2.EQUIPO(NOMBRE,FECHA_FUN,PAIS)" +
       "VALUES(:nombre,TO_DATE(:fec,'DD-MM-YYYY'),:pais)"
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

async function LlenarDirectores(ruta){
    let result,id;
    let json = csvToJson.fieldDelimiter(',').formatValueByType().latin1Encoding().getJsonFromCsv(ruta);
    console.log(json);
    for (let i=0;i<json.length;i++){
        
        const pais = {
            pais: json[i].Pais_Equipo,
            nombre: json[i].Equipo
        }
        const select_id_equipo = `SELECT ID_EQUIPO FROM DBP2.EQUIPO WHERE NOMBRE='${pais.nombre}' AND PAIS='${pais.pais}'`
        try{
            conec = await oracledb.getConnection(connAttrs)
            result = await conec.execute(select_id_equipo,[])
            id = result.rows[0][0]
        }catch(err){
            console.error(err)
            return { ok: false, err }
        }finally{
            if (conec) {
                conec.release((err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        }       
        const dt ={
            nombres:json[i].Nombres,
            fnac:json[i].Fecha_Nac,
            pais:json[i].Pais,
            estado:json[i].Estado,
            idequipo:id,
            fini:json[i].Fecha_Ini,
            ffin:json[i].Fecha_Fin
        }
        const insert_query = "INSERT INTO DBP2.DIRECTOR_TECNICO(NOMBRES,FECHA_NAC,PAIS,ESTADO,EQUIPO_ID_EQUIPO,FECHA_INI,FECHA_FIN)" +
       `VALUES('${dt.nombres}',TO_DATE('${dt.fnac}','DD-MM-YYYY'),'${dt.pais}','${dt.estado}',${dt.idequipo},TO_DATE('${dt.fini}','DD-MM-YYYY'),TO_DATE('${dt.ffin}','DD-MM-YYYY'))`
        try {
            con = await oracledb.getConnection(connAttrs)
            await con.execute(insert_query,[], { autoCommit: true })
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

async function LlenarJugadores(ruta){
    let result,id;
    let json = csvToJson.fieldDelimiter(',').formatValueByType().latin1Encoding().getJsonFromCsv(ruta);
    console.log(json);
    for (let i=0;i<json.length;i++){
        
        const pais = {
            pais: json[i].Pais_Equipo,
            nombre: json[i].Equipo
        }
        const select_id_equipo = `SELECT ID_EQUIPO FROM DBP2.EQUIPO WHERE NOMBRE='${pais.nombre}' AND PAIS='${pais.pais}'`
        try{
            conec = await oracledb.getConnection(connAttrs)
            result = await conec.execute(select_id_equipo,[])
            id = result.rows[0][0]
        }catch(err){
            console.error(err)
            return { ok: false, err }
        }finally{
            if (conec) {
                conec.release((err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        }       
        const dt ={
            nombres:json[i].Nombre,
            fnac:json[i].Fecha_Nac,
            pais:json[i].Nacionalidad,
            estado:json[i].Posicion,
            idequipo:id,
            fini:json[i].Fecha_Ini,
            ffin:json[i].Fecha_Fin
        }
        const insert_query = "INSERT INTO DBP2.JUGADOR(NOMBRE,FECHA_NAC,NACIONALIDAD,POSICION,EQUIPO_ID_EQUIPO,FECHA_INI,FECHA_FIN)" +
       `VALUES('${dt.nombres}',TO_DATE('${dt.fnac}','DD-MM-YYYY'),'${dt.pais}','${dt.estado}',${dt.idequipo},TO_DATE('${dt.fini}','DD-MM-YYYY'),TO_DATE('${dt.ffin}','DD-MM-YYYY'))`
        try {
            con = await oracledb.getConnection(connAttrs)
            await con.execute(insert_query,[], { autoCommit: true })
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

async function LlenarCompeticion(ruta){
    let result,id;
    let json = csvToJson.fieldDelimiter(',').formatValueByType().latin1Encoding().getJsonFromCsv(ruta);
    console.log(json);
    for (let i=0;i<json.length;i++){
        
        const pais = {
            pais: json[i].Pais_Equipo,
            nombre: json[i].Equipo
        }
        const select_id_equipo = `SELECT ID_EQUIPO FROM DBP2.EQUIPO WHERE NOMBRE='${pais.nombre}' AND PAIS='${pais.pais}'`
        try{
            conec = await oracledb.getConnection(connAttrs)
            result = await conec.execute(select_id_equipo,[])
            id = result.rows[0][0]
        }catch(err){
            console.error(err)
            return { ok: false, err }
        }finally{
            if (conec) {
                conec.release((err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        }       
        const dt ={
            nombres:json[i].Nombre,
            anio:json[i].Anio,
            tipo:json[i].Tipo,
            campeon:json[i].Campeon,
            pais:json[i].Pais,
            idequipo:id
        }
        const insert_query = "INSERT INTO DBP2.COMPETICION(NOMBRE,ANIO,TIPO,CAMPEON,PAIS,EQUIPO_ID_EQUIPO)" +
       `VALUES('${dt.nombres}',${dt.anio},'${dt.tipo}','${dt.campeon}','${dt.pais}','${dt.idequipo}')`
        try {
            con = await oracledb.getConnection(connAttrs)
            await con.execute(insert_query,[], { autoCommit: true })
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

async function LlenarPartidosIncidencias(ruta){
    let id_partido,id_local,id_visita,id_jugador;
    let json = csvToJson.fieldDelimiter(',').formatValueByType().latin1Encoding().getJsonFromCsv(ruta);
    console.log(json);
    for (let i=0;i<json.length;i++){
        
        const pais = {
            pais_local: json[i].Pais_Local,
            nombre_local: json[i].Equipo_Local,
            pais_visita: json[i].Pais_Visita,
            nombre_visita: json[i].Equipo_Visita,
            estadio: json[i].Estadio
        }
        const select_id_equipo_local = `SELECT ID_EQUIPO FROM DBP2.EQUIPO WHERE NOMBRE='${pais.nombre_local}' AND PAIS='${pais.pais_local}'`
        const select_id_equipo_visita = `SELECT ID_EQUIPO FROM DBP2.EQUIPO WHERE NOMBRE='${pais.nombre_visita}' AND PAIS='${pais.pais_visita}'`
        const select_estadio = `SELECT ID_ESTADIO FROM DBP2.ESTADIOS WHERE NOMBRE = '${pais.estadio}'`
        try{
            conec = await oracledb.getConnection(connAttrs)
            result_local = await conec.execute(select_id_equipo_local,[])
            result_visita = await conec.execute(select_id_equipo_visita,[])
            result_estadio = await conec.execute(select_estadio,[])
            id_local = result_local.rows[0][0]
            id_visita = result_visita.rows[0][0]
            id_estadio = result_estadio.rows[0][0]
        }catch(err){
            console.error(err)
            return { ok: false, err }
        }finally{
            if (conec) {
                conec.release((err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        }
        
        const partido ={
            fecha: json[i].Fecha,
            publico: json[i].Asistencia,
            resultado: json[i].Resultado,
            estado:json[i].Estado,
            idestadio: id_estadio,
            idlocal:id_local,
            idvisitante:id_visita,
            jugador:json[i].Jugador,
            incidencia:json[i].Incidencia,
            minuto:json[i].Minuto
        }
        const insert_query = "INSERT INTO DBP2.PARTIDO(FECHA,PUBLICO,RESULTADO,ESTADO,estadios_id_estadio,equipo_id_equipo,equipo_id_equipo2)" +
       `VALUES(TO_DATE('${partido.fecha}','DD-MM-YYYY'),${partido.publico},'${partido.resultado}','${partido.estado}',${partido.idestadio},${partido.idlocal},${partido.idvisitante})`
       const select_query = `SELECT ID_PARTIDO FROM DBP2.PARTIDO where FECHA=TO_DATE('${partido.fecha}','DD-MM-YYYY') AND PUBLICO=${partido.publico} AND RESULTADO='${partido.resultado}' AND ESTADO='${partido.estado}' AND estadios_id_estadio=${partido.idestadio} AND equipo_id_equipo=${partido.idlocal} AND equipo_id_equipo2=${partido.idvisitante}`
       const select_id_jugador = `SELECT ID_JUGADOR FROM DBP2.JUGADOR WHERE NOMBRE = '${partido.jugador}' AND (EQUIPO_ID_EQUIPO=${partido.idlocal} OR EQUIPO_ID_EQUIPO=${partido.idvisitante})`
       
        try {
            con = await oracledb.getConnection(connAttrs)
            await con.execute(insert_query,[], { autoCommit: true })
            result_idpartido = await con.execute(select_query,[])
            result_idjugador = await con.execute(select_id_jugador,[])
            id_partido = result_idpartido.rows[0][0]
            id_jugador = result_idjugador.rows[0][0]
            const insert_incidencia = "INSERT INTO DBP2.PARTIDO_INCIDENCIAS(INCIDENCIA,MINUTO,JUGADOR_ID_JUGADOR,PARTIDO_ID_PARTIDO)"+
            `VALUES('${partido.incidencia}',${partido.minuto},${id_jugador},${id_partido})`
            await con.execute(insert_incidencia,[],{ autoCommit: true })

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
async function ReturnIdUser(email){
    let id_user;
    const select_id_user = `SELECT ID FROM DBP2.USUARIOS WHERE EMAIL='${email}'`
        try{
            conec = await oracledb.getConnection(connAttrs)
            result = await conec.execute(select_id_user,[])
            id_user = result.rows[0][0]
        }catch(err){
            console.error(err)
            return { ok: false, err }
        }finally{
            if (conec) {
                conec.release((err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        }
    return{ok:true,id:id_user}
}
async function ReturnIdUserEmpleado(email){
    let id_user;
    const select_id_user = `SELECT ID_EMPLEADO FROM DBP2.EMPLEADOS WHERE EMAIL='${email}'`
        try{
            conec = await oracledb.getConnection(connAttrs)
            result = await conec.execute(select_id_user,[])
            id_user = result.rows[0][0]
        }catch(err){
            console.error(err)
            return { ok: false, err }
        }finally{
            if (conec) {
                conec.release((err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        }
    return{ok:true,id:id_user}
}


async function consultaEquipos(){
    let con, result
    const query = "SELECT * FROM DBP2.EQUIPO"        
    try {
        con = await oracledb.getConnection(connAttrs)
        result = await con.execute(query, [], { autoCommit: true})
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
    if (result.rows.length >= 1) {
              
        return {
            ok: true, result:{equipo:result.rows}
        }
    }
    return { ok: false }
}
async function Suscribirse(equipo){
    let conec, result,idequipo
    const pais = {
        nombre: equipo.nombre
    }
    const select_id_equipo = `SELECT ID_EQUIPO FROM DBP2.EQUIPO WHERE NOMBRE='${equipo.nombre}'`
    try{
        conec = await oracledb.getConnection(connAttrs)
        result = await conec.execute(select_id_equipo,[])
        idequipo = result.rows[0][0]
        const insert_query = "INSERT INTO DBP2.SUBS_EQUIPOS(USUARIOS_ID,EQUIPO_ID_EQUIPO)"+
        `VALUES(${idActual.id},${idequipo})`
        await conec.execute(insert_query,[],{ autoCommit: true })
    }catch(err){
        console.error(err)
        return { ok: false, err }
    }finally{
        if (conec) {
            conec.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    return {ok:true}
}
async function ComprarMembresia(){
    let conec, result,idequipo
    const insert_query = `UPDATE DBP2.USUARIOS set TIPO_MEMBRECIA = 'PAGO'  WHERE ID=${idActual.id}`
    try{
        conec = await oracledb.getConnection(connAttrs)
        await conec.execute(insert_query,[],{ autoCommit: true })
    }catch(err){
        console.error(err)
        return { ok: false, err }
    }finally{
        if (conec) {
            conec.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    return {ok:true}   
}
async function AddNoticia(req){
    let con, result,idequiponoti
    // consulta a ejecutar
    const select_id_equipo = `SELECT ID_EQUIPO FROM DBP2.EQUIPO WHERE NOMBRE='${req.equipo}'`
    try {
        con = await oracledb.getConnection(connAttrs)
        result = await con.execute(select_id_equipo, [])
        const insert_query = "INSERT INTO DBP2.NOTICIAS(NOTICA,EQUIPO_ID_EQUIPO,EMPLEADOS_ID_EMPLEADO)" +
        "VALUES(:noti,:equi,:empleado)"
        idequiponoti = result.rows[0][0]
        const binds = [req.noticia,idequiponoti,idActualEmpleado] 
        await con.execute(insert_query,binds, { autoCommit: true })
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


