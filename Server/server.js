
var express = require("express");
var app = express();
var bodyparser = require('body-parser');
var oracledb = require('oracledb');
const bcrypt = require('bcrypt');

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
    extended: true
}));
 
var connAttrs = {
    "user": "DBP2",
    "password": "1234",
    "connectString": "localhost:1521/ORCL18"
    //"(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
}
//hola

app.get('/',(req,res)=>{
    res.send([{message: 'hola nenes'}]);
});

app.post('/login', async (req, res) => {
    console.log(req.body);
    let body = req.body
    let result = await login(body)
    if (result.ok) {
        res.send('confirmado!!')
        return res.status(200).send(result)
    } else {
        if (result.err) {
            // Error imprevisto
            return res.status(500).send(result)
        } else {
            // Usuario o contraseña inválidos
            res.send('usuario o contra incoicas incorrectas')
            return res.status(result.status).send({ ok: false })
        }
    }
})

/*
app.post('/aa/login',(req,res) =>{
    //recibiremos el user y la pass en json



    const {ID_TIPOUSUARIO,TIPO_USUARIO} = req.body;
    if(ID_TIPOUSUARIO && TIPO_USUARIO){
        res.send('datos correctos!');
        console.log(req.body);
    }else{
        console.log(req.body);
        res.send('falta un dato');
    }   
    
})*/

app.post('/registrar',(req,res) =>{
    const {usuario,contra,email,tipo_usuario,nombre,apellido} = req.body;
})



//funciones.
async function login(req) {
    let con, result
    // consulta a ejecutar
    const query = "SELECT usuarios.EMAIL, usuarios.CONTRA" +
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
        //let confirmado = result.rows[0][3]
        let pwd = result.rows[0][1]
            if (bcrypt.compareSync(req.pwd, pwd)) {
                //let id = result.rows[0][0]
                /*let esAdmin = result.rows[0][2]
                let token = sign({ id, esAdmin },
                    'seed-de-dessarollo-miap2',
                    { expiresIn: '48h' })*/
                // Credenciales correctas y correo confirmado
                return { ok: true/*, token, esAdmin*/ }
            }
        
    }else{
        return { ok: false, status: 401 }   
    }
    // Correo o contraseña incorrecta
    return { ok: false, status: 401 }
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


