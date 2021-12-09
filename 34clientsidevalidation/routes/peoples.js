const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const catchAsync = require('../utils/catchAsync');
const { exemploMiddleware, verifyPassword, validatePeople } = require('../middleware');


const peoples = require('../controllers/peoples');

router.get('/', catchAsync(peoples.listPeoples));

router.get('/secret', verifyPassword, peoples.listPeoples);

router.get('/new', peoples.newPeople);
router.post('/', validatePeople, catchAsync(peoples.savePeople));

router.get('/:id', catchAsync(peoples.detailPeople));

router.get('/:id/edit', catchAsync(peoples.editPeople));

router.put('/:id', catchAsync(peoples.updatePeople));

router.delete('/:id', catchAsync(peoples.deletePeople));






module.exports = router;


