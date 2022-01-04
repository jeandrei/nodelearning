const Cadastro = require('../models/cadastro');


module.exports.newCadastro = (req, res) => {
    console.log('Entrou no controller');
    res.render('cadastros/new');
}


module.exports.saveCadastro = async (req, res) => {
    const newCadastro = new Cadastro(req.body.cadastro);
    await newCadastro.save();
    res.redirect('cadastros/');
    console.log(`Novo cadastro gravado com sucesso: ${newCadastro}`);
}

module.exports.listCadastros = async (req, res) => {
    const cadastros = await Cadastro.find({});
    console.log('Entrou no controller cadastro index'); 
    res.render('cadastros/index', { cadastros });
}

//====================detailCadastro======================
module.exports.detailCadastro = async (req, res) => {
    //pegamos o id do registro
    const { id } = req.params;
    //fazemos a busca n banco de dados e passamos os valores para constante cadastro
    const cadastro = await Cadastro.findById(id);
    //se quiser verificar se está buscando o registro
    //localize um id no mongo db.cadastros.find({})
    //copie o id e cole no navegador http://ip:porta/cadastros/61a624a5cb409f3efbf8a4b2
    //e de um console.log(cadastro);
    //console.log(cadastro);
    res.render('cadastros/details', { cadastro });
}
//======================================================