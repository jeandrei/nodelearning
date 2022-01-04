
const express = require('express');
const router = express.Router();


const cadastros = require('../controllers/cadastros');
router.get('/new', cadastros.newCadastro);
router.post('/', cadastros.saveCadastro);
router.get('/', cadastros.listCadastros);
router.get('/:id', cadastros.detailCadastro);

//==========================Rota para pagina de edição=======================
router.get('/:id/edit', cadastros.editCadastro);
//=============================================================================

//==========================Rota gravar os dados editados=======================
//para atingir essa rota tem que usar o method override lá no formulário
///people/?_method=PUT
router.put('/:id', cadastros.updateCadastro);
//=============================================================================



router.get('/delete', (req, res) => {
    res.render('cadastros/delete');
});

router.delete('/', (req, res) => {
    res.send('Você clicou em delete');
});

module.exports = router;