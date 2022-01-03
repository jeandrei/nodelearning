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

router.get('/:id', peoples.detailPeople);

//==========================Rota para pagina de edição=======================
router.get('/:id/edit', peoples.editPeople);
//=============================================================================

//==========================Rota gravar os dados editados=======================
//para atingir essa rota tem que usar o method override lá no formulário
///people/?_method=PUT
router.put('/:id', peoples.updatePeople);
//=============================================================================


//==========================================================



module.exports = router;


