
const express = require('express');
const router = express.Router();

//==========================Require=================================
const catchAsync = require('../utils/catchAsync');
//==================================================================

const { exemploMiddleware, verifyPassword } = require('../middleware');


const cadastros = require('../controllers/cadastros');
router.get('/new', cadastros.newCadastro);
router.post('/', catchAsync(cadastros.saveCadastro));
//=============Chama a função catcAsync em todas as rotas async do controller=================
router.get('/', catchAsync(cadastros.listCadastros));
//============================================================================================
router.get('/secret', catchAsync(verifyPassword, cadastros.listCadastros));
router.get('/:id', catchAsync(cadastros.detailCadastro));
router.get('/:id/edit', catchAsync(cadastros.editCadastro));
router.put('/:id', catchAsync(cadastros.updateCadastro));
router.delete('/:id', catchAsync(cadastros.deleteCadastro));



router.get('/delete', (req, res) => {
    res.render('cadastros/delete');
});

router.delete('/', (req, res) => {
    res.send('Você clicou em delete');
});

module.exports = router;