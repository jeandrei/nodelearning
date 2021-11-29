/**
 * =================BASIC ROUTING==================
 * Every rout has a req and res object.
 * 
 * -Request Object − The request object represents the HTTP request and 
 * has properties for the request query string, parameters, body, HTTP 
 * headers, and so on.
 * 
 * -Response Object − The response object represents the HTTP response 
 * that an Express app sends when it gets an HTTP request.
 * 
 * You can print req and res objects which provide a lot of information related to HTTP 
 * request and response including cookies, sessions, URL, etc.
 * 
 */

//Pego a porta configurada lá no arquivo .env
require('dotenv').config();
const port = process.env.PORT;

//require no express
const express = require('express');
const app = express();

// This responds with "Hello World" on the homepage
app.get('/', (req, res) => {
    console.log('Got a Get request for the homepage');
    res.send('Hello Get');
});

// This responds with all contente from req
app.get('/req', (req, res) => {
    console.log('All we hava on a req object');
    console.log(req);
    res.send('Check the console to see what we have on a req object');
});

// This responds with all contente from req
app.get('/res', (req, res) => {
    console.log('All we hava on a res object');
    console.log(res);
    res.send('Check the console to see what we have on a res object');
});

// This responds a POST request for the homepage you can test using postman
app.post('/', (req, res) => {
    console.log('Got a POST request for the homepage');
    res.send('Hello POST');
});

// This responds a DELETE request for the /del_user page.
//postman http://ip:3001/del_user
app.delete('/del_user', (req,res) => {
    console.log('Got a DELETE request for /del_user');
    res.send('Hello DELETE');
});

// This responds a GET request for the /list_user page.
//postman http://ip:3001/list_user
app.get('/list_user', (req, res) => {
    console.log('Got a GET request for /list_users');
    res.send('Page Listening');
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', (req,res) => {
    console.log('Got a GET request for /ab*cd');
    res.send('Page Pattern Match');
});


const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})