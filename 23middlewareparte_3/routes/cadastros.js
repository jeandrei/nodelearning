
const express = require('express');
const router = express.Router();

//=================da um require na middleware pode atribuir a uma const de mesmo nome==================
const { exemploMiddleware } = require('../middleware');
//depois para chamar ela é só colocar depois da virgula na rota
//======================================================================================================




const cadastros = require('../controllers/cadastros');
router.get('/new', cadastros.newCadastro);
router.post('/', cadastros.saveCadastro);
//========================Chama a middleware na rota========================
router.get('/', exemploMiddleware, cadastros.listCadastros);
//==========================================================================
router.get('/:id', cadastros.detailCadastro);
router.get('/:id/edit', cadastros.editCadastro);
router.put('/:id', cadastros.updateCadastro);
router.delete('/:id', cadastros.deleteCadastro);



router.get('/delete', (req, res) => {
    res.render('cadastros/delete');
});

router.delete('/', (req, res) => {
    res.send('Você clicou em delete');
});

module.exports = router;