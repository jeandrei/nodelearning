const Cadastro = require('../models/cadastro');


module.exports.newCadastro = (req, res) => {    
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

module.exports.editCadastro = async (req, res) => { 
    const { id } = req.params;
    const cadastro = await Cadastro.findById(id);   
    res.render('cadastros/edit', { cadastro });   
}



module.exports.updateCadastro = async (req, res) => {    
    const { id } = req.params;   
    const cadastro = await Cadastro.findByIdAndUpdate(id, req.body.cadastro, { runValidators: true, new: true });    
    res.redirect(`/cadastros/${cadastro._id}`);
}

module.exports.deleteCadastro = async (req, res) => {
    const { id } = req.params;
    const deletedCadastro = await Cadastro.findByIdAndDelete(id);
    res.redirect('/cadastros');
};
