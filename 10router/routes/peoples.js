//Para os routes precisa no mínimo o express
const express = require('express');
//Definimos uma rota com express.Router
const router = express.Router();
//Criamos as rotas e ao invés de usar app.get e assim por diante usamos router.get...
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/new', (req, res) => {
    res.render('people/new');
});


 router.post('/save', urlencodedParser, (req, res) => {    
    response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));  
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


