const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//=================da um require na middleware pode atribuir a uma const de mesmo nome==================
const { exemploMiddleware } = require('../middleware');
//depois para chamar ela é só colocar depois da virgula na rota
//======================================================================================================



//==========================ROTAS===========================
const peoples = require('../controllers/peoples');

//====================Executa a middleware na rota==================================
router.get('/', exemploMiddleware, peoples.listPeoples);
//==================================================================================

router.get('/new', peoples.newPeople);

router.post('/', peoples.savePeople);

router.get('/:id', peoples.detailPeople);

router.get('/:id/edit', peoples.editPeople);

router.put('/:id', peoples.updatePeople);

router.delete('/:id', peoples.deletePeople);





module.exports = router;


