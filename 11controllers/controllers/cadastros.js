module.exports.newCadastro = (req, res) => {
    console.log('Entrou no controller');
    res.render('cadastros/new');
}

module.exports.saveCadastro = (req, res) => {
    console.log(req.body);    
}