/**
 * ====================INSTALAR O EXPRESS=============================
 * Express is a minimal and flexible Node.js web application framework that provides a
 * robust set of features to develop web and mobile applications. It facilitates the rapid
 * development of Node based Web applications. Following are some of the core
 * features of Express framework −
 * -Allows to set up middlewares to respond to HTTP Requests.
 * -Defines a routing table which is used to perform different actions based on HTTP Method and URL.
 * -Allows to dynamically render HTML Pages based on passing arguments to templates.
 * 
 * Installing Express
 * npm install express --save
 * 
 * The above command saves the installation locally in the node_modules directory 
 * and creates a directory express inside node_modules. You should install the 
 * following important modules along with express −
 * -body-parser − This is a node.js middleware for handling JSON, Raw, Text 
 * and URL encoded form data.
 * -cookie-parser − Parse Cookie header and populate req.cookies 
 * with an object keyed by the cookie names.
 * multer − This is a node.js middleware for handling multipart/form-data.
 * 
 * npm install body-parser --save //não precisa instalar esse uso o urlencoded
 * npm install cookie-parser --save
 * npm install multer --save
 */

//Pego a porta configurada lá no arquivo .env
require('dotenv').config();
const port = process.env.PORT || 3000;

//require no express
const express = require('express');
const app = express();

//cria uma rota e envia o texto hello world
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})