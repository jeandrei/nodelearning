
const express = require('express');
const router = express.Router();


const cadastros = require('../controllers/cadastros');
router.get('/new', cadastros.newCadastro);
router.post('/', cadastros.saveCadastro);
router.get('/', cadastros.listCadastros);
router.get('/:id', cadastros.detailCadastro);
router.get('/:id/edit', cadastros.editCadastro);
router.put('/:id', cadastros.updateCadastro);

//=======================DELETE===========================================
router.delete('/:id', cadastros.deleteCadastro);
//=============================================================================



router.get('/delete', (req, res) => {
    res.render('cadastros/delete');
});

router.delete('/', (req, res) => {
    res.send('Você clicou em delete');
});

module.exports = router;