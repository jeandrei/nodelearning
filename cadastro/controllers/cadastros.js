const Cadastro = require("../models/cadastro");

module.exports.newCadastro = (req, res) => {
    const teste = "valoreteste";
    res.render('cadastros/new', { teste });
}

module.exports.listCadastros = async (req, res) => {
    const cadastros = await Cadastro.find({});
    res.render('cadastros/list', { cadastros });    
}

module.exports.saveCadastro = (req, res) => {
    console.log(req.body);
}

module.exports.deleteCadastro = (req, res) => {
    res.send('Você clicou em delete');
}