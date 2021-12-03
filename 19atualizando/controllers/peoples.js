const People = require('../models/people');

module.exports.listPeoples = async (req, res) => {
    const peoples = await People.find({});
    console.log('Entrou no controller people index');     
    res.render('people/index', { peoples });
}

module.exports.newPeople = (req, res) => {    
    res.render('people/new');
}


module.exports.savePeople = async (req, res) => {   
    const newPeople = new People(req.body);
    await newPeople.save();
    res.redirect('peoples/');
    console.log(`Nova pessoa gravada com sucesso!`);
}


module.exports.detailPeople = async (req, res) => {
    const { id } = req.params;
    const people = await People.findById(id);   
    res.render('people/details', { people });
}

//=====================CONTROLLER PARA EDITAR REGISTRO==================
module.exports.editPeople = async (req, res) => { 
    const { id } = req.params;
    const people = await People.findById(id);   
    res.render('people/edit', { people });   
}
//======================================================================


//===========CONTROLLER PARA ATUALIZAR OS DADOS EDITADOS==================
//runValidators if true, runs update validators on this command. Update validators
//validate the update operation agains the model's schema.
//ou seja runValidators true vai fazer a validação definida no schema
//assim como é feito quando grava um novo
module.exports.updatePeople = async (req, res) => {
    const { id } = req.params;
    const people = await People.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/peoples/${people._id}`);
}
//========================================================================
