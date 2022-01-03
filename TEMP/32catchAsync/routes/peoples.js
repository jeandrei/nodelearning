const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//==========================Require=================================
const catchAsync = require('../utils/catchAsync');
//==================================================================

const { exemploMiddleware, verifyPassword } = require('../middleware');




const peoples = require('../controllers/peoples');

//=============Chama a função catcAsync em todas as rotas async do controller=================
router.get('/', catchAsync(peoples.listPeoples));
//=================================================================

router.get('/secret', verifyPassword, peoples.listPeoples);

router.get('/new', peoples.newPeople);

router.post('/', catchAsync(peoples.savePeople));

router.get('/:id', catchAsync(peoples.detailPeople));

router.get('/:id/edit', catchAsync(peoples.editPeople));

router.put('/:id', catchAsync(peoples.updatePeople));

router.delete('/:id', catchAsync(peoples.deletePeople));






module.exports = router;


