const Pessoa = require('../models/pessoas');

module.exports.newPessoa = async (req, res) => {  
    const pessoas = await Pessoa.find({});
    res.render('pessoas/new', { pessoas });
}

module.exports.savePessoa = async (req, res) => {
    const newPessoa = new Pessoa(req.body);
    await newPessoa.save();
    console.log('Nova pessoa gravada com sucesso');
    res.redirect('/pessoas/new');
}

module.exports.listPessoas = async (req, res) => {
    const pessoas = await Pessoa.find({});
    res.render('pessoas/index', { pessoas });
}