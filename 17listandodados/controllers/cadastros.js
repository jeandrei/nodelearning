//===========================IMPORTE O MODEL=====================================
const Cadastro = require('../models/cadastro');
//===============================================================================

module.exports.newCadastro = (req, res) => {
    console.log('Entrou no controller');
    res.render('cadastros/new');
}

module.exports.saveCadastro = (req, res) => {
    console.log(req.body);    
}

//==========================CRIA O CONTROLLER LIST CADASTROS=======================
//que vai rendeniar o arquivo views/cadastros/index.ejs
module.exports.listCadastros = async (req, res) => {
    //pego todos os dados do banco
    const cadastros = await Cadastro.find({});
    console.log('Entrou no controller cadastro index'); 
    //rendenizamos o index passando todos os dados encontrados no banco  
    //de forma que no arquivo views/people/index eu tenho acesso a esses dados
    res.render('cadastros/index', { cadastros });
}
//================================================================================