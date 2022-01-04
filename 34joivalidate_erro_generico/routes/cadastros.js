
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

//======================da um require na middleware validatePeople====================
const { exemploMiddleware, verifyPassword, validateCadastro } = require('../middleware');
//====================================================================================

const cadastros = require('../controllers/cadastros');
router.get('/new', cadastros.newCadastro);

//tirei para testar validatePeople
//=====================chama a middleware validatePeople na rota=============
router.post('/', validateCadastro, catchAsync(cadastros.saveCadastro));
//===========================================================================

router.get('/', catchAsync(cadastros.listCadastros));
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