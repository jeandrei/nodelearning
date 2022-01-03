const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//========================PEGO A MIDDLEWARE verifyPassword==============
const { exemploMiddleware, verifyPassword } = require('../middleware');
//======================================================================



const peoples = require('../controllers/peoples');

router.get('/', peoples.listPeoples);
//===========================uso ela na rota /secret=========
//agora essa rota só vai funcionar se for com a url
//http:ip:porta/peoples/secret?password=secret
router.get('/secret', verifyPassword, peoples.listPeoples);
//===========================================================

router.get('/new', peoples.newPeople);

router.post('/', peoples.savePeople);

router.get('/:id', peoples.detailPeople);

router.get('/:id/edit', peoples.editPeople);

router.put('/:id', peoples.updatePeople);

router.delete('/:id', peoples.deletePeople);






module.exports = router;


