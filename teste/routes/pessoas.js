const express = require('express');
const router = express.Router();

const pessoas = require('../controllers/pessoas');


router.get('/', (req, res) => {
    res.send('Got a Get request for the homepage');
});

router.get('/new', pessoas.newPessoa);

router.post('/', (req, res) => {
    console.log(req.body);
});

router.delete('/', (req, res) => {
    console.log('você clicou em delete');
});

router.get('/res', (req, res) => {
    res.send('Got to the /res');
});

module.exports = router;