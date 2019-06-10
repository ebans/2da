const express = require('express')
const app = express()
 
const path = require('path');
const directoriopublico = path.join(__dirname,'../public');
app.use(express.static(directoriopublico));
console.log(__dirname)

app.listen(3000, ()=>{
console.log('puerto 3000')
});