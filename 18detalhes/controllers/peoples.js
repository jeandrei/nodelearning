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


//====================detailPeople======================
module.exports.detailPeople = async (req, res) => {
    //pegamos o id do registro
    const { id } = req.params;
    //fazemos a busca n banco de dados e passamos os valores para constante people
    const people = await People.findById(id);
    //se quiser verificar se está buscando o registro
    //localize um id no mongo db.people.find({})
    //copie o id e cole no navegador http://ip:porta/peoples/61a624a5cb409f3efbf8a4b2
    //e de um console.log(people);
    //console.log(people);
    res.render('people/details', { people });
}
//======================================================
