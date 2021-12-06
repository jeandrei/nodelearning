const People = require('../models/people');


const scores = [0,1,2,3,4,5,6,7,8,9,10];

module.exports.listPeoples = async (req, res) => {
    const peoples = await People.find({});    
    res.render('people/index', { peoples });
}


module.exports.newPeople = (req, res) => {    
    res.render('people/new', { scores });
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


module.exports.editPeople = async (req, res) => { 
    const { id } = req.params;
    const people = await People.findById(id);   
    res.render('people/edit', { people, scores });   
}


module.exports.updatePeople = async (req, res) => {
    const { id } = req.params;
    const people = await People.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/peoples/${people._id}`);
}

//=============================DELETE====================================
module.exports.deletePeople = async (req, res) => {
    const { id } = req.params;
    const deletedPeople = await People.findByIdAndDelete(id);
    res.redirect('/peoples');
};
//=================================================================
