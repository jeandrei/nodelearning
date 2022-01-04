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
    res.render('cadastros/index', { cadastros });
}

module.exports.detailCadastro = async (req, res) => {
    const { id } = req.params;
    const cadastro = await Cadastro.findById(id);
    res.render('cadastros/details', { cadastro });
}

//=====================CONTROLLER PARA EDITAR REGISTRO==================
module.exports.editCadastro = async (req, res) => { 
    const { id } = req.params;
    const cadastro = await Cadastro.findById(id);   
    res.render('cadastros/edit', { cadastro });   
}
//======================================================================


//===========CONTROLLER PARA ATUALIZAR OS DADOS EDITADOS==================
//runValidators if true, runs update validators on this command. Update validators
//validate the update operation agains the model's schema.
//ou seja runValidators true vai fazer a validação definida no schema do mongoose
//assim como é feito quando grava um novo
module.exports.updateCadastro = async (req, res) => {    
    const { id } = req.params;   
    const cadastro = await Cadastro.findByIdAndUpdate(id, req.body.cadastro, { runValidators: true, new: true });    
    res.redirect(`/cadastros/${cadastro._id}`);
}
//========================================================================
