const express = require('express');
const router = express.Router();


const peoples = require('../controllers/peoples');
router.get('/new', peoples.newPeople);


 router.post('/save', (req, res) => {    
    console.log(req.body);
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


