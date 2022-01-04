
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

//======================da um require na middleware validateSchema====================
const { verifyPassword, validaSchema } = require('../middleware');
//====================================================================================

//======================require na schema==========================================
const { cadastroSchema } = require('../schemas.js');
//=================================================================================

const cadastros = require('../controllers/cadastros');
router.get('/new', cadastros.newCadastro);


//=====================NO POST chama a middleware validaSchema =============
//passando a schema para validar e a página que é para retornar 
router.post('/', validaSchema(cadastroSchema, 'cadastros/new'), catchAsync(cadastros.saveCadastro));
//===========================================================================

router.get('/', catchAsync(cadastros.listCadastros));
router.get('/secret', catchAsync(verifyPassword, cadastros.listCadastros));
router.get('/:id', catchAsync(cadastros.detailCadastro));
router.get('/:id/edit', catchAsync(cadastros.editCadastro));

//===========================================================================
router.put('/:id', validaSchema(cadastroSchema, 'cadastros/edit'), catchAsync(cadastros.updateCadastro));
//===========================================================================
router.delete('/:id', catchAsync(cadastros.deleteCadastro));

router.get('/delete', (req, res) => {
    res.render('cadastros/delete');
});

router.delete('/', (req, res) => {
    res.send('Você clicou em delete');
});

module.exports = router;