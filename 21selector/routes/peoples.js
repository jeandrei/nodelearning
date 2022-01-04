const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const peoples = require('../controllers/peoples');

router.get('/', peoples.listPeoples);
router.get('/new', peoples.newPeople);
router.post('/', peoples.savePeople);
router.get('/:id', peoples.detailPeople);
router.get('/:id/edit', peoples.editPeople);
router.put('/:id', peoples.updatePeople);


module.exports = router;


