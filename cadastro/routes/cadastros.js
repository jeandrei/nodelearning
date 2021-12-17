const express = require('express');

const router = express.Router();


const cadastros = require('../controllers/cadastros');

//Aqui imprimo os dados para confirmar que os dados estão sendo enviados
router.get('/', cadastros.listCadastros);

//Carrega o formulário para a criação de um novo cadastro
router.get('/new', cadastros.newCadastro);
//Post
router.post('/', cadastros.saveCadastro);

router.delete('/', cadastros.deleteCadastro);

module.exports = router;