const fs = require ('fs');
listaEstudiantes=[];

const crear=(estudiante)=>{
   listar();
    let est={
      nombre:estudiante.nombre,
      matematicas:estudiante.matematicas,
      ingles:estudiante.ingles,
      programacion:estudiante.programacion
    };
    let duplicado=listaEstudiantes.find(nom =>nom.nombre == estudiante.nombre)
    if (!duplicado){
        listaEstudiantes.push(est);
        console.log(listaEstudiantes);
        guardar();
    }else
    console.log('ya existe el estudiante');
    
}

const listar=()=>{
    try { 
   listaEstudiantes=require('./listado.json');
} catch (err){
   //asincronica
//listaEstudiantes=JSON.parse(fs.readFileSync('listado.json'));
listaEstudiantes=[]; 
}
}
const guardar = () =>{
let datos=JSON.stringify(listaEstudiantes);
fs.writeFile('listado.json',datos,(err)=>{
    if(err) throw (err);
    console.log('Archivo creado');
})
}
const mostrar  = () =>{
    listar()
    console.log('Notas de los estudiantes')
    listaEstudiantes.forEach(estudiante => {
      console.log (estudiante.nombre);
      console.log('Notas')
      console.log(' matematicas '+ estudiante.matematicas);
      console.log(' Ingles '+ estudiante.ingles);
      console.log(' programacion '+ estudiante.programacion +'\n'); 
    });
}
const mostrarest =(nom)=>{
    listar()
    let est=listaEstudiantes.find(buscar =>buscar.nombre == nom)
    if (!est){
        console.log('No existe el estudiante')
    }else{
    console.log (est.nombre);
      console.log('Notas')
      console.log(' matematicas '+ est.matematicas);
      console.log(' Ingles '+ est.ingles);
      console.log(' programacion '+ est.programacion +'\n');
    }
}
const mostrarmat =()=>{
    listar();
    let gana= listaEstudiantes.filter(mat =>mat.matematicas >=3);
    if (gana.length == 0){
        console.log ('Ningun estudiante va ganando')

    }else {
        gana.forEach(estudiante => {
            console.log (estudiante.nombre);
            console.log('Notas')
            console.log(' matematicas '+ estudiante.matematicas);
             
          }); 
    }

}
const actualizar =(nom,asignatura,calificacion)=>{
listar();
let encontrado=listaEstudiantes.find(buscar =>buscar.nombre == nom)
if (!encontrado){
  console.log('estudiante no encontrado');
}else {
 encontrado[asignatura]=calificacion;
 guardar();
}
}
const eliminar =(nom)=>{
    listar();
    let nuevo= listaEstudiantes.filter(mat =>mat.nombre != nom);
    if (nuevo.length == listaEstudiantes.length){
        console.log ('Ningun estudiante tiene el nombre')

    }else {
        
        listaEstudiantes=nuevo
        guardar();
          } 
    }    


module.exports ={
    crear,
    mostrar,
    mostrarest,
    mostrarmat,
    actualizar,
    eliminar
}