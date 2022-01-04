const Cadastro = require('../models/cadastro');


module.exports.newCadastro = (req, res) => {
    console.log('Entrou no controller');
    res.render('cadastros/new');
}

//===========IMPORTANTISSIMO PARA TER ACESSO AO req.body TEMOS QUE TER O 
//usar a middlewhare urlencoded lá no app.js
//app.use(express.urlencoded({ extended: true }));
module.exports.saveCadastro = async (req, res) => {   
    //Cadastro(req.body.cadastro)vai trazer todos os valores mas aqui é só exemplo não tem validação
    //Essa linha é muito importante para funcionar quando colocamos os nomes dos campos como cadastro[cadastroNome];
    //pq para trazer apenas o cadastroNome que precisamos para validar no model precisamos colocar da seguinte forma
    //req.body.cadastro
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