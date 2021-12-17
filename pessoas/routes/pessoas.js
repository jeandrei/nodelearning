const express = require('express');
const router = express.Router();

const pessoas = require('../controllers/pessoas');


router.get('/', pessoas.listPessoas);

router.get('/new', pessoas.newPessoa);

router.post('/', pessoas.savePessoa);

router.delete('/', (req, res) => {
    console.log('você clicou em delete');
});

router.get('/res', (req, res) => {
    res.send('Got to the /res');
});

module.exports = router;