/**
 * 
 * Depende do multer
 * 
 * npm install --save multer
 * 
 *The following HTML code creates a file uploader form.
 *This form has method attribute set to POST and enctype attribute is set to 
 *multipart/form-data
 *no formulário tem que ser adicionado enctype="multipart/form-data"
 */


require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
//====================================REQUIRE FS==================
const fs = require("fs");
//======================================================
const methodOverride = require('method-override');
app.use(express.static('public'));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

//====================================REQUIRE MULTER==================
const multer = require('multer');
//====================================================================



app.get('/people/new', (req, res) => {
    res.render('people/new');
})


app.post('/people/save', (req, res) => {    
    response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));  
})


app.get('/people/delete', (req, res) => {
    res.render('people/delete');
})

app.delete('/people', (req,res) => {
    res.send('Você clicou no delete');
})


// CRIAMOS UMA STORAGE PARA ARMAZENAR AS IMAGENS NESTE CASO EM public/uploads
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      //cb(null, file.fieldname + '-' + Date.now()) se não quiser armazenar a extenção do arquivo troque a linha debaixo por essa
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
let upload = multer({ storage: storage })


//O formulário envia para /people/upload
//file_upload é o nome do input lá do formulário input type field name='file_upload'
app.post('/people/upload', upload.single('file_upload'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
  });
  
/*
  //Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
   
      res.send(files)
    
  })
*/

const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})