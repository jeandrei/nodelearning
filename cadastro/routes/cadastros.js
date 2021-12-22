const express = require('express');

const router = express.Router();


const cadastros = require('../controllers/cadastros');

const middleware = require('../middleware');

//Aqui imprimo os dados para confirmar que os dados estão sendo enviados
router.get('/', cadastros.listCadastros);

router.get('/secret', middleware.verifyPassword, cadastros.listCadastros);

//Carrega o formulário para a criação de um novo cadastro
router.get('/new', cadastros.newCadastro);
//Post
router.post('/', cadastros.saveCadastro);
//Details
router.get('/:id', cadastros.detailCadastro);
//Edit form
router.get('/:id/edit', cadastros.editCadastro);
//Update cadastro
router.put('/:id', cadastros.updateCadastro);


router.delete('/:id', cadastros.deleteCadastro);

module.exports = router;