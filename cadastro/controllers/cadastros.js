const Cadastro = require("../models/cadastro");


module.exports.listCadastros = async (req, res) => {
    const cadastros = await Cadastro.find({});
    res.render('cadastros/list', { cadastros });    
};

//rendeniza o formulário
module.exports.newCadastro = (req, res) => {    
    res.render('cadastros/new');
};

//salva no banco de dados
module.exports.saveCadastro = async (req, res) => { 
    console.log(req.body.cadastro);   
    const newCadastro = new Cadastro(req.body.cadastro);
    await newCadastro.save();
    res.redirect('cadastros/');   
};

//Detail cadastro
module.exports.detailCadastro = async (req, res) => {
    const { id } = req.params;
    const cadastro = await Cadastro.findById(id);
    res.render('cadastros/details', { cadastro });
};


//Edit form
module.exports.editCadastro = async (req, res) => {
    const { id } = req.params;
    const cadastro = await Cadastro.findById(id);
    res.render('cadastros/edit', { cadastro });
}
//Update cadastro
module.exports.updateCadastro = async (req, res) => {
    const { id } = req.params;
    //aqui também precisa colocar req.body.cadastro
    const cadastro = await Cadastro.findByIdAndUpdate(id, req.body.cadastro, { runValidators: true, new: true });
    res.redirect(`/cadastros/${cadastro._id}`);
}

module.exports.deleteCadastro = async (req, res) => {
    const { id } = req.params;
    const deleteCadastro = await Cadastro.findByIdAndDelete(id);
    res.redirect('/cadastros')
};