const express = require('express');

const router = express.Router();


const cadastros = require('../controllers/cadastros');

const { verifyPassword, validaSchema } = require('../middleware');

//======================require na schema==========================================
const { cadastroSchema } = require('../schemas.js');
//=================================================================================

const catchAsync = require('../utils/catchAsync');

//Aqui imprimo os dados para confirmar que os dados estão sendo enviados
router.get('/', catchAsync(cadastros.listCadastros));

router.get('/secret', verifyPassword, catchAsync(cadastros.listCadastros));

//Carrega o formulário para a criação de um novo cadastro
router.get('/new', cadastros.newCadastro);
//Post
//=================================chamo validaSchema passando a schema que quero validar e a página onde quero redirecionar==============================================
router.post('/', validaSchema(cadastroSchema, 'cadastros/new'), catchAsync(cadastros.saveCadastro));
//========================================================================================================================================================================
//Details
router.get('/:id', catchAsync(cadastros.detailCadastro));
//Edit form
router.get('/:id/edit', catchAsync(cadastros.editCadastro));
//Update cadastro
router.put('/:id', validaSchema(cadastroSchema, 'cadastros/edit'), catchAsync(cadastros.updateCadastro));


router.delete('/:id', catchAsync(cadastros.deleteCadastro));

module.exports = router;