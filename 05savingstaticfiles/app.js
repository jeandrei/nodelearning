/**
 * Serving Static Files
 * Express provides a built-in middleware express.static to serve static files, such as 
 * images, CSS, JavaScript, etc.
 * You simply need to pass the name of the directory where you keep your static 
 * assets, to the express.static middleware to start serving the files directly. 
 * For example, if you keep your images, CSS, and JavaScript files in a directory 
 * named public, you can do this −
 * 
 */

//Pego a porta configurada lá no arquivo .env
require('dotenv').config();
const port = process.env.PORT || 3000;

//require no express
const express = require('express');
const app = express();

//Quando definimos a pasta public como static para referenciar qualquer conteúdo dentro da pasta
//basta chamar ip:porta/conteúdo exemplo dentro temos uma pasta imagens e dentro da pasta imagens tem o 
//arquivo cento.jpg logo para chamar esse arquivo no browse simplesmente digitamos
//http://ip:porta/imagens/centro.jpg
//ou se vc quiser referenciar por exemplo a um arquivo hello.js que está dentro de 
//public vc pode fazer src='\hello.css' apenas não precisa colocar o caminho completo
app.use(express.static('public'));

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})