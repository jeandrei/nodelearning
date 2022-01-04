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

//===============adicionado o try catch pois se não e req,res,next======
//nunca vai atingir o app.use do errorHandler
//app.use((err,req, res, next) => {
module.exports.listCadastros = async (req, res, next) => {  
    try{
        const cadastros = await Cadastro.find({});  
        //========================erro proposital=================
        //cadastros.fly is not a function 
        //para ver acesse a rota /cadastros
        cadastros.fly();
        //=======================================================
        res.render('cadastros/index', { cadastros });

    } catch (e){
        next(e);
    }     
}
//====================================================================

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
