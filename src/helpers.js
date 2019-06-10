const hbs =require('hbs');
const fs = require ('fs');
hbs.registerHelper('obtenerPromedio',(nota1,nota2,nota3)=>{
return (nota1+nota2+nota3)/3;
});




listaEstudiantes=[];
curso=[];

hbs.registerHelper('crear',(codigo,nombre,descripcion,valor,modalidad,intensidad)=>{
   
    let est={
      codigo:codigo,
      nombre:nombre,
      descripcion:descripcion,
      valor:valor,
      modalidad:modalidad,
      intensidad:intensidad,
      estado:'disponible'
    };
    let duplicado=listaEstudiantes.find(nom =>nom.codigo == codigo)
    if (!duplicado){
        listaEstudiantes.push(est);
        guardar();
        return (console.log(listaEstudiantes));
       
    }else
    return('Ya existe un curso con ese codigo');
    
});

const guardar = () =>{
      let datos=JSON.stringify(listaEstudiantes);
      fs.writeFile('src/curso.json',datos,(err)=>{
          if(err) throw (err);
          console.log('Archivo creado');
      });
      }
const guardar1 = () =>{
            let datos=JSON.stringify(curso);
            fs.writeFile('src/matricula.json',datos,(err)=>{
                if(err) throw (err);
                console.log('Archivo creado');
            })
            }
      
        
      
            
hbs.registerHelper('cursos',()=>{
listaEstudiantes=require('./curso.json');
let texto="<table class='table'>\
            <thead class='thead-dark'> \
        <th scope='col'> Codigo </th>\
        <th scope='col'> Nombre </th>\
        <th scope='col'> Descripción </th>\
        <th scope='col'> Valor </th>\
        <th scope='col'> Modalidad </th>\
        <th scope='col'> Intensidad </th>\
        <th scope='col'> Estado </th>\
        </thead>\
        <tbody>";
listaEstudiantes.forEach(estudiantes => {
texto=texto +
      '<tr>'+
      '<th scope="row">' + estudiantes.codigo + '</th>'+
      '<th>' + estudiantes.nombre + '</th>'+
      '<th>'+ estudiantes.descripcion + '</th>'+
      '<th>'+ estudiantes.valor + '</th>'+
      '<th>'+ estudiantes.modalidad + '</th>'+
      '<th>'+ estudiantes.intensidad + '</th>'+
      '<th>'+ estudiantes.estado + '</th></tr>';
      
});
texto=texto+'</tbody></table>';
return texto;

});

hbs.registerHelper('listar',()=>{
      listaEstudiantes=require('./curso.json');
      let gana= listaEstudiantes.filter(mat =>mat.estado =='disponible');
      if (gana.length == 0){
            return ('No hay ningún curso disponible');
    
        }else {

      let texto="<div class='accordion' id='accordionExample'>";
                 
      i=1;
      gana.forEach(estudiantes => {
      texto=texto +
      `<div class="card">
                        <div class="card-header" id="heading${i}">
                        <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                       ${estudiantes.nombre}
                        </button>
                        </h2>
                        </div>
                  
                        <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                        <div class="card-body">
                        Nombre del curso: ${estudiantes.nombre} tiene un valor de ${estudiantes.valor} <br>
                        modalidad: ${estudiantes.modalidad} y el contenido de este es ${estudiantes.descripcion}<br>
                        con una intensidad :${estudiantes.intensidad}
                       
                        </div>
                        </div>`;
            
            i=i+1;
      });
      texto=texto+'</div>';
      return texto;
}
      });

hbs.registerHelper('mostrarmat',()=>{
            listaEstudiantes=require('./curso.json');
            
            let gana= listaEstudiantes.filter(mat =>mat.estado =='disponible');
            
            if (gana.length == 0){
                return ('No hay ningún curso disponible');
        
            }else {
                  let texto="<table class='table'>\
            <thead class='thead-dark'> \
        <th scope='col'> Codigo </th>\
        <th scope='col'> Nombre </th>\
        <th scope='col'> Descripción </th>\
        <th scope='col'> Valor </th>\
        <th scope='col'> Modalidad </th>\
        <th scope='col'> Intensidad </th>\
        <th scope='col'> Estado </th>\
        </thead>\
        <tbody>";
                gana.forEach(estudiantes => {
                  texto=texto +
      '<tr>'+
      '<th scope="row">' + estudiantes.codigo + '</th>'+
      '<th>' + estudiantes.nombre + '</th>'+
      '<th>'+ estudiantes.descripcion + '</th>'+
      '<th>'+ estudiantes.valor + '</th>'+
      '<th>'+ estudiantes.modalidad + '</th>'+
      '<th>'+ estudiantes.intensidad + '</th>'+
      '<th>'+ estudiantes.estado + '</th></tr>';
                
});
            
texto=texto+'</tbody></table>';
return texto;
            }
        
        });
        
  
hbs.registerHelper('llenar',()=>{
            listaEstudiantes=require('./curso.json');
            
            let gana= listaEstudiantes.filter(mat =>mat.estado =='disponible');
            
            if (gana.length == 0){
                return ('No hay ningún curso disponible');
        
            }else {
                  texto='<select name="cursos">';  
                gana.forEach(estudiantes => {
                  texto=texto +
                 '<option value="1" name="area1" disabled>'+estudiantes.nombre+'</option> ';
      
    
                
});
            
texto=texto+' </select>';
return texto;
            }
        
        });
hbs.registerHelper('matricula',(id,correo,nombre,telefono,area)=>{
   
            let est1={
              id:id,
              correo:correo,
              nombre:nombre,
              telefono:telefono,
              area:area
              
            };
            let duplicado1=curso.find(nom1 =>nom1.id == id)
            if (!duplicado1){
                  curso.push(est1);
                guardar1();
                return (console.log(curso));
               
            }else
            return('Ya esta registrado en ese curso');
            
        });
              
        hbs.registerHelper('curs',()=>{
            curso=require('./matricula.json');
            let gana= curso.filter(mat =>mat.id >0);
            if (gana.length == 0){
                  return ('No hay ningún curso disponible');
          
              }else {
      
            let texto="<div class='accordion' id='accordionExample'>";
                       
            i=1;
            gana.forEach(estudiantes => {
            texto=texto +
            `<div class="card">
                              <div class="card-header" id="heading${i}">
                              <h2 class="mb-0">
                              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                             ${estudiantes.area}
                              </button>
                              </h2>
                              </div>
                        
                              <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                              <div class="card-body">
                             <table class='table'>
                             <thead class='thead-dark'> \
                              <th scope='col'> identificacion </th>\
                              <th scope='col'> Nombre </th>\
                              <th scope='col'> correo </th>\
                              <th scope='col'> telefono </th>\
                              <th scope='col'> area </th>\
                              <th scope='col'> Eliminar </th>\
                              <th scope='col'> Actualizar </th>\
                              </thead>\
                              <tbody>
                              
                        <tr>
                        <th scope="row"> ${estudiantes.id}  </th>
                        <th scope="row"> ${estudiantes.nombre}  </th>
                        <th scope="row"> ${estudiantes.correo}  </th>
                        <th scope="row"> ${estudiantes.telefono}  </th>
                        <th scope="row"> ${estudiantes.area}  </th>
                       
                       <th> <a class="nav-item nav-link" href="/eliminar?id=${estudiantes.id}">eliminar</a></th>
                       <th> <a class="nav-item nav-link" href="/actualizar?id=${estudiantes.area}&estado=disponible">Actualizar</a></th>
                        
                        </tr>

                              </tbody></table>
                              </div>
                              </div>`;
                              
                  i=i+1;
            });
            
            texto=texto+'</div>';
            return texto;
      }
            });
            hbs.registerHelper( 'eliminar',(id)=>{
      curso=require('./matricula.json');
                  let nuevo= curso.filter(mat =>mat.id != id);
                  if (nuevo.length == curso.length){
                      console.log ('Ningun estudiante tiene el nombre')
              
                  }else {
                      
                        curso=nuevo
                      guardar1();
                        } 
                  } );

                  hbs.registerHelper('actualizar',(area,estado)=>{
                        listaEstudiantes=require('./curso.json');
                        let encontrado=listaEstudiantes.find(buscar =>buscar.area == area)
                        if (!encontrado){
                          console.log('no se ha podido actualizar');
                        }else {
                         encontrado[estado]='cerrado';
                         guardar();
                        }
                        });
                        

