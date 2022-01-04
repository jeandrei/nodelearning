const Cadastro = require('../models/cadastro');


//=================APENAS PARA TESTAR A SAÍDA DO ERRO DO MONGOOSE PODE APAGAR DEPOIS=========================
//===============================Require no mongooseErrorFormater============================================
const { mongooseErrorFormatter } = require('../utils/validationFormatter');
//===========================================================================================================


//rendeniza o formulário
module.exports.newCadastro = (req, res) => {    
    //==========================================================
     res.render('cadastros/new', { message: {}, formData: {}, errors: {} });
    //========================================================= 
 };

module.exports.saveCadastro = async (req, res) => {
    const newCadastro = new Cadastro(req.body.cadastro);
    await newCadastro.save();
     //=========================APENAS PARA TESTAR a saida do mongoose pode apagar depois=======================
     //NO ROUTER TEM QUE TIRAR A VALIDAÇÃO DO JOI PARA TESTAR 
     // Teste aqui https://codebeautify.org/jsonviewer CLIQUE EM BEAUTIFY
     /*try{        
        await newCadastro.save();
    } catch (e) {
        return res.send(mongooseErrorFormatter(e));
    }*/
    //===========================================================================================================
    
    res.redirect('cadastros/');
}


module.exports.listCadastros = async (req, res, next) => {     
    const cadastros = await Cadastro.find({});  
    //cadastros.fly();        
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
    //================================================================================   
    res.render('cadastros/edit', { cadastro, message: {}, formData: {}, errors: {} }); 
    //================================================================================
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
