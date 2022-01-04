
const express = require('express');
const router = express.Router();
//=========================================================
const { exemploMiddleware, verifyPassword } = require('../middleware');
//=========================================================

const cadastros = require('../controllers/cadastros');
router.get('/new', cadastros.newCadastro);
router.post('/', cadastros.saveCadastro);
router.get('/', cadastros.listCadastros);

//===========================uso ela na rota /secret=========
//agora essa rota só vai funcionar se for com a url
//http:ip:porta/cadastros/secret?password=secret
router.get('/secret', verifyPassword, cadastros.listCadastros);
//===========================================================

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