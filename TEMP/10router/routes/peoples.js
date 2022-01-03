//Para os routes precisa no mínimo o express
const express = require('express');
//Definimos uma rota com express.Router
const router = express.Router();


router.get('/new', (req, res) => {
    res.render('people/new');
});


 router.post('/save', (req, res) => {    
   console.log(req.body) ;
}); 


router.get('/delete', (req, res) => {
    res.render('people/delete');
});

router.delete('/', (req,res) => {
    res.send('Você clicou no delete');
});


//Exportamos a rota
//Daí lá no app.js damos um require na rota
module.exports = router;


