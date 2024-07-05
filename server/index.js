const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sitrashcrud"
});


app.post('/login', (req, res) => {
    const { Usuario, Clave } = req.body;
    const query = "SELECT * FROM Usuarios WHERE Usuario = ? AND Clave = ?";
    
    db.query(query, [Usuario, Clave], (err, result) => {
        if (err) {
            res.status(500).send({ error: "Error en la consulta" });
        } else if (result.length > 0) {
            res.send({ success: true, message: "Inicio de sesión exitoso" }); // Respuesta de éxito
        } else {
            res.status(401).send({ success: false, message: "Usuario o contraseña incorrectos" }); // Respuesta de fallo
        }
    });
});


app.post("/create",(req,res)=>{

    const est_civil = req.body.est_civil;
    const direccion = req.body.direccion;
    const villa_pobl = req.body.villa_pobl;
    const comuna = req.body.comuna;
    const ciudad = req.body.ciudad;
    const region = req.body.region;
    const cel_personal = req.body.cel_personal;
    const ci = req.body.ci;
    const sede = req.body.sede;
    const estado = req.body.estado;
    const n_registro = req.body.n_registro;
    const fecha_inscripcion = req.body.fecha_inscripcion;
    const forma_pago = req.body.forma_pago;
    const mes_desc = req.body.mes_desc;
    const puesto_trabajo = req.body.puesto_trabajo;
    const asociado = req.body.asociado;
    const email = req.body.email;
    const razon_social = req.body.razon_social;
    const empresa_rut_empresa = req.body.empresa_rut_empresa;

    db.query('INSERT INTO registrosocios(f_nac, est_civil, direccion, villa_pobl, comuna, ciudad, region, cel_personal, ci, sede, estado, n_registro, fecha_inscripcion, forma_pago, mes_desc, puesto_trabajo, asociado, email, razon_social, empresa_rut_empresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ['1990-01-15', est_civil, direccion, villa_pobl, comuna, ciudad, region, cel_personal, ci, sede, estado, n_registro, fecha_inscripcion, forma_pago, mes_desc, puesto_trabajo, asociado, email, razon_social, empresa_rut_empresa],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.get("/registrosocios", (req,res)=>{
    db.query('SELECT * from registrosocios',
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
})


app.put("/editar",(req,res)=>{
    const {
        ci,
        // f_nac,
        est_civil,
        direccion, 
        villa_pobl,
        comuna,
        ciudad,
        region,
        cel_personal,
        sede,
        estado,
        n_registro,
        fecha_inscripcion,
        forma_pago,
        mes_desc,
        puesto_trabajo,
        asociado,
        email,
        razon_social,
        empresa_rut_empresa
    } = req.body;

    const sql = `
    UPDATE registrosocios
    SET est_civil = ?, direccion = ?, villa_pobl = ?, comuna = ?, ciudad = ?, region = ?, cel_personal = ?, sede = ?, estado = ?, n_registro = ?, fecha_inscripcion = ?, forma_pago = ?, mes_desc = ?, puesto_trabajo = ?, asociado = ?, email = ?, razon_social = ?, empresa_rut_empresa = ? 
    WHERE ci = ?`;


    db.query(sql,  [ est_civil, direccion, villa_pobl, comuna, ciudad, region, cel_personal, sede, estado, n_registro, fecha_inscripcion, forma_pago, mes_desc, puesto_trabajo, asociado, email, razon_social, empresa_rut_empresa, ci], (err, result) => {
        if (err) {
            console.log('Error al actualizar el socio:', err);
            res.status(500).send({ message: 'Error al actualizar el socio' });
          } else {
            res.send({ message: 'Socio actualizado con éxito' });
          }
        });
      });

      app.put("/editarSocio",(req,res)=>{
        const {
            ci,
            sede,
            estado,
            n_registro,
            fecha_inscripcion,
            forma_pago,
            mes_desc,
            puesto_trabajo,
            asociado,
            email,
            razon_social,
            empresa_rut_empresa
        } = req.body;
    
        const sql = `
        UPDATE registrosocios
        SET sede = ?, estado = ?, n_registro = ?, fecha_inscripcion = ?, forma_pago = ?, mes_desc = ?, puesto_trabajo = ?, asociado = ?, email = ?, razon_social = ?, empresa_rut_empresa = ? 
        WHERE ci = ?`;
    
        db.query(sql,  [ sede, estado, n_registro, fecha_inscripcion, forma_pago, mes_desc, puesto_trabajo, asociado, email, razon_social, empresa_rut_empresa, ci], (err, result) => {
            if (err) {
                console.log('Error al actualizar el socio:', err);
                res.status(500).send({ message: 'Error al actualizar el socio' });
              } else {
                res.send({ message: 'Socio actualizado con éxito' });
              }
            });
          });

          app.put("/editarPersona",(req,res)=>{
            const {
                ci,
                // f_nac,
                est_civil,
                direccion, 
                villa_pobl,
                comuna,
                ciudad,
                region,
                cel_personal,
                asociado,
                email,
                razon_social,
                empresa_rut_empresa
            } = req.body;
        
            const sql = `
            UPDATE registrosocios
            SET est_civil = ?, direccion = ?, villa_pobl = ?, comuna = ?, ciudad = ?, region = ?, cel_personal = ?, asociado = ?, email = ?, razon_social = ?, empresa_rut_empresa = ? 
            WHERE ci = ?`;
        
        
            db.query(sql,  [ est_civil, direccion, villa_pobl, comuna, ciudad, region, cel_personal, asociado, email, razon_social, empresa_rut_empresa, ci], (err, result) => {
                if (err) {
                    console.log('Error al actualizar el socio:', err);
                    res.status(500).send({ message: 'Error al actualizar el socio' });
                  } else {
                    res.send({ message: 'Socio actualizado con éxito' });
                  }
                });
              });
    
app.delete("/delete/:ci",(req,res)=>{
    const ci = req.params.ci;

    db.query('DELETE FROM registrosocios WHERE ci = ?',ci,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/empresas", (req,res)=>{
    db.query('SELECT * from empresas',
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
})


app.put("/editarEmpresa",(req,res)=>{
    const {
        RAZON_SOCIAL,
        RUT_EMPRESA,
        FONO,
        CORREO_ELECTRONICO,
        REPRESENTANTE_LEGAL,
        CI_REPRESENTANTE,
        COMUNA_RAZON,
        DIRECCION_RAZON,
        CIUDAD_RAZON,
        REGION_RAZON
    } = req.body;

    const sql = `
    UPDATE empresas
    SET RAZON_SOCIAL = ?, FONO = ?, CORREO_ELECTRONICO = ?, REPRESENTANTE_LEGAL = ?, CI_REPRESENTANTE = ?, COMUNA_RAZON = ?, DIRECCION_RAZON = ?, CIUDAD_RAZON = ?, REGION_RAZON = ?
    WHERE RUT_EMPRESA = ?`;

    db.query(sql,  [ RAZON_SOCIAL, FONO, CORREO_ELECTRONICO, REPRESENTANTE_LEGAL, CI_REPRESENTANTE, COMUNA_RAZON, DIRECCION_RAZON, CIUDAD_RAZON, REGION_RAZON, RUT_EMPRESA], (err, result) => {
        if (err) {
            console.log('Error al actualizar el Empresa:', err);
            res.status(500).send({ message: 'Error al actualizar la Empresa' });
          } else {
            res.send({ message: 'Empresa actualizado con éxito' });
          }
        });
      });

      app.delete("/delete/:RUT_EMPRESA",(req,res)=>{
        const ci = req.params.ci;
    
        db.query('DELETE FROM empresas WHERE RUT_EMPRESA = ?',ci,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
        );
    });


    app.post("/crear",(req,res)=>{

        const RAZON_SOCIAL = req.body.RAZON_SOCIAL;
        const RUT_EMPRESA = req.body.RUT_EMPRESA;
        const FONO = req.body.FONO;
        const CORREO_ELECTRONICO = req.body.CORREO_ELECTRONICO;
        const REPRESENTANTE_LEGAL = req.body.REPRESENTANTE_LEGAL;
        const CI_REPRESENTANTE = req.body.CI_REPRESENTANTE;
        const COMUNA_RAZON = req.body.COMUNA_RAZON;
        const DIRECCION_RAZON = req.body.DIRECCION_RAZON;
        const CIUDAD_RAZON = req.body.CIUDAD_RAZON;
        const REGION_RAZON = req.body.REGION_RAZON;
    
        db.query('INSERT INTO empresas(RAZON_SOCIAL, RUT_EMPRESA, FONO, CORREO_ELECTRONICO, REPRESENTANTE_LEGAL, CI_REPRESENTANTE, COMUNA_RAZON, DIRECCION_RAZON, CIUDAD_RAZON, REGION_RAZON) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [RAZON_SOCIAL, RUT_EMPRESA, FONO, CORREO_ELECTRONICO, REPRESENTANTE_LEGAL, CI_REPRESENTANTE, COMUNA_RAZON, DIRECCION_RAZON, CIUDAD_RAZON, REGION_RAZON],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
        );
    });

app.listen(3001, ()=>{
  console.log("Corriendo en puerto 3001")
})