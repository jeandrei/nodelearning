const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//==========================ROTAS===========================
const peoples = require('../controllers/peoples');

//lista as pessoas gravadas ip/peoples
router.get('/', peoples.listPeoples);

//para inserir nova pessoa ip/peoples/new
router.get('/new', peoples.newPeople);

//para salvar uma nova people savePeople está no models
router.post('/', peoples.savePeople);


//==========================Rota para pagina de detalhes=======================
router.get('/:id', peoples.detailPeople);
//=============================================================================


//==========================================================



module.exports = router;


