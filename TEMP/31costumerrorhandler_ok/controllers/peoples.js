const People = require('../models/people');


const scores = [0,1,2,3,4,5,6,7,8,9,10];

//===============adicionado o try catch pois se não e req,res,next
//nunca vai atingir o app.use do errorHandler
//app.use((err,req, res, next) => {
module.exports.listPeoples = async (req, res, next) => {    
    try{
        const peoples = await People.find({});  
        //========================erro proposital=================
        //peoples.fly is not a function 
        //para ver acesse a rota /peoples
        peoples.fly();
        //=======================================================
        res.render('people/index', { peoples });

    } catch (e){
        next(e);
    }     
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
    console.log(people);
    res.redirect(`/peoples/${people._id}`);
}

module.exports.deletePeople = async (req, res) => {
    const { id } = req.params;
    const deletedPeople = await People.findByIdAndDelete(id);
    res.redirect('/peoples');
};

