
const express = require('express');
const router = express.Router();

//==================================================================
//define o controller
const cadastros = require('../controllers/cadastros');
//carrega o formulário
router.get('/new', cadastros.newCadastro);
//exibe o req.body no console
router.post('/', cadastros.saveCadastro);
//==================================================================

router.get('/delete', (req, res) => {
    res.render('cadastros/delete');
});

router.delete('/', (req, res) => {
    res.send('Você clicou em delete');
});

module.exports = router;