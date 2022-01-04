const People = require('../models/people');
const ExpressError = require('../utils/ExpressError');


const scores = [0,1,2,3,4,5,6,7,8,9,10];


module.exports.listPeoples = async (req, res, next) => { 
        const peoples = await People.find({});        
        res.render('people/index', { peoples });
 }


module.exports.newPeople = (req, res) => {    
    res.render('people/new', { scores });
}


module.exports.savePeople = async (req, res, next) => {  
    //a linha abaixo da um erro genérico se faltar alguma coisa vai dar o erro cadastro inválido
    //if(!req.body.people) throw new ExpressError('Cadastro inválido', 400);
    //Com o joi o erro é mais específico  
    const newPeople = new People(req.body.people);
    await newPeople.save();
   //console.log(req.body);  
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
    console.log(req.body);
    //=====================Tive que atualizar essa linha=======================
    //de req.body para ...req.body.people caso contário não atualizava
    //depois que eu mudei para people[first_name] ...
    const people = await People.findByIdAndUpdate(id, { ...req.body.people }, { runValidators: true, new: true });
    console.log(people);
    res.redirect(`/peoples/${people._id}`);
}

module.exports.deletePeople = async (req, res) => {
    const { id } = req.params;
    const deletedPeople = await People.findByIdAndDelete(id);
    res.redirect('/peoples');
};

