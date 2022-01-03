
//Para os routes precisa no mínimo o express
const express = require('express');

//Definimos uma rota com express.Router
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('cadastros/new');
});

router.post('/', (req, res) => {
    console.log(req.body);
});

router.get('/delete', (req, res) => {
    res.render('cadastros/delete');
});

router.delete('/', (req, res) => {
    res.send('Você clicou em delete');
});

//Exportamos a rota
//Daí lá no app.js damos um require na rota
module.exports = router;