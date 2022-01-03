const People = require('../models/people');
const ExpressError = require('../utils/ExpressError');


const scores = [0,1,2,3,4,5,6,7,8,9,10];

//===============Pode tirar o try catch das funções async
//já está sendo chamada no route
module.exports.listPeoples = async (req, res, next) => { 
        const peoples = await People.find({});
        //descomente a linha abaixo para verificar o erro na rota /peoples         
        //peoples.fly();
        res.render('people/index', { peoples });
 }


module.exports.newPeople = (req, res) => {    
    res.render('people/new', { scores });
}


module.exports.savePeople = async (req, res) => {  
    //================Agora podemos mandar menságens de erro personalizada=====
    if(!req.body.people) throw new ExpressError('Cadastro inválido', 400);
    //==================bem como com o código==================================
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
    console.log(people);
    res.redirect(`/peoples/${people._id}`);
}

module.exports.deletePeople = async (req, res) => {
    const { id } = req.params;
    const deletedPeople = await People.findByIdAndDelete(id);
    res.redirect('/peoples');
};

