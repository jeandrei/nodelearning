const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const catchAsync = require('../utils/catchAsync');

//======================da um require na middleware validatePeople====================
const { exemploMiddleware, verifyPassword, validatePeople } = require('../middleware');
//====================================================================================



const peoples = require('../controllers/peoples');

router.get('/', catchAsync(peoples.listPeoples));

router.get('/secret', verifyPassword, peoples.listPeoples);

router.get('/new', peoples.newPeople);
//tirei para testar validatePeople
//=====================chama a middleware validatePeople na rota=============
router.post('/', validatePeople, catchAsync(peoples.savePeople));
//===========================================================================
router.get('/:id', catchAsync(peoples.detailPeople));

router.get('/:id/edit', catchAsync(peoples.editPeople));

router.put('/:id', catchAsync(peoples.updatePeople));

router.delete('/:id', catchAsync(peoples.deletePeople));






module.exports = router;


