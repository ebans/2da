const express = require('express');
const app = express();
const path = require('path');
const hbs =require('hbs');
require('./helpers');
const bodyParser=require('body-parser');
const directoriopublico = path.join(__dirname,'../public');
const directoriopartial=path.join(__dirname,'../partials');
hbs.registerPartials(directoriopartial);
app.use(express.static(directoriopublico));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','hbs');

app.get('/',(req,res)=>{
res.render('index',{
 estudiante:'Inicio'
});
});
app.get('/calculos',(req,res)=>{
    res.render('calculos',{
        estudiante:'Inscripción'
    });
    });

    app.get('/detalle',(req,res)=>{
        res.render('detalle',{
         estudiante:'Detalle Curso'
        });
        });
    

app.post('/ingresar',(req,res)=>{
    res.render('ingresar',{
     codigo:req.body.codCurso,
     nombre:req.body.nombre,
     modalidad:req.body.modalidad,
     valor:req.body.valor,
     descripcion:req.body.descripcion,
     intensidad:req.body.intensidad
    });
    });

 app.post('/regis',(req,res)=>{
        res.render('regis',{
            id:req.body.id,
            correo:req.body.correo,
            nombre:req.body.nombre,
            telefono:req.body.telefono,
            area:req.body.area
        
        });
        });
    
app.get('/icurso',(req,res)=>{
        res.render('icurso',{
            estudiante:'Matricula'
        });
        }); 
 app.get('/curs',(req,res)=>{
            res.render('curs',{
                estudiante:'Cursos'
            });
            }); 
           
 app.get('/eliminar',(req,res)=>{
    console.log(req.query)            
    res.render('eliminar',{
                    id:req.query.id
                   
                });
                }); 
app.get('/actualizar',(req,res)=>{
 console.log(req.query)            
 res.render('actualizar',{
 id:req.query.area,
 estado:req.query.estado
   });
 });                                    

app.listen(3000, ()=>{
console.log('puerto 3000')
});