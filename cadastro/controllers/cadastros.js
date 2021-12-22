const Cadastro = require("../models/cadastro");


module.exports.listCadastros = async (req, res) => {
    const cadastros = await Cadastro.find({});
    res.render('cadastros/list', { cadastros });    
}

//rendeniza o formulário
module.exports.newCadastro = (req, res) => {    
    res.render('cadastros/new');
}
//salva no banco de dados
module.exports.saveCadastro = async (req, res) => { 
    console.log(req.body.cadastro);   
    const newCadastro = new Cadastro(req.body.cadastro);
    await newCadastro.save();
    res.redirect('cadastros/');   
}

module.exports.deleteCadastro = (req, res) => {
    res.send('Você clicou em delete');
}