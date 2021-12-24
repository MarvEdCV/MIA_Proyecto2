
var express = require("express");
var app = express();
var bodyparser = require('body-parser');
var oracledb = require('oracledb');
const { sign } = require('jsonwebtoken')

const nodemailer = require('nodemailer')



app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


const emailService = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "spmedranocojulun16@gmail.com",
        secure: false,
        pass: "sara160519"
        //proyectomia2
    }
}) 

var connAttrs = {
    "user": "DBP2",
    "password": "1234",
    "connectString": "localhost:1521/ORCL18"
}


app.get('/',(req,res)=>{
    res.send([{message: 'hola nenes'}]);
});

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

app.post('/registrar',async (req,res) =>{
    let body = req.body;
    let result = await create(body)
    if (result.ok) {
        
        // Envía el correo de confirmación
        const baseUrl = `http://localhost:4200/Verificacion${result.id}`
        const data = {
            from: "Eduardo Catalán",
            to: body.email,
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



//funciones.
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
        connection.execute("SELECT * FROM tipousuario", {}, {
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


