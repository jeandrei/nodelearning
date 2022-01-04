
const express = require('express');
const router = express.Router();


const cadastros = require('../controllers/cadastros');
//=========================================================================
//Rota para carregar o formulário
router.get('/new', cadastros.newCadastro);
//Rota para salvar os dados
router.post('/', cadastros.saveCadastro);
//=========================================================================
router.get('/', cadastros.listCadastros);


router.get('/delete', (req, res) => {
    res.render('cadastros/delete');
});

router.delete('/', (req, res) => {
    res.send('Você clicou em delete');
});

module.exports = router;