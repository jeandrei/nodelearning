const People = require('../models/people');

module.exports.listPeoples = async (req, res) => {
    //pego todos os dados do banco
    const peoples = await People.find({});
    console.log('Entrou no controller people index'); 
    //rendenizamos o index passando todos os dados encontrados no banco  
    //de forma que no arquivo views/people/index eu tenho acesso a esses dados
    res.render('people/index', { peoples });
}

module.exports.newPeople = (req, res) => {    
    res.render('people/new');
}

//===========IMPORTANTISSIMO PARA TER ACESSO AO req.body TEMOS QUE TER O 
//usar a middlewhare urlencoded lá no app.js
//app.use(express.urlencoded({ extended: true }));
module.exports.savePeople = async (req, res) => {   
    //People(req.body)vai trazer tudos os valores mas aqui é só exemplo não tem validação
    //Essa linha é muito importante para funcionar quando colocamos os nomes dos campos como people[firstName];
    //pq para trazer apenas o firstName que precisamos para validar no model precisamos colocar da seguinte forma
    //req.body.people
    const newPeople = new People(req.body.people);
    await newPeople.save();
    res.redirect('peoples/');
    console.log(`Nova pessoa gravada com sucesso: ${newPeople}`);
}

