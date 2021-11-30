//===========================IMPORTE O MODEL=====================================
const People = require('../models/people');
//===============================================================================

//==========================CRIA O CONTROLLER LIST PEOPLES=======================
//que vai rendeniar o arquivo views/people/index.ejs
module.exports.listPeoples = async (req, res) => {
    //pego todos os dados do banco
    const peoples = await People.find({});
    console.log('Entrou no controller people index'); 
    //rendenizamos o index passando todos os dados encontrados no banco  
    //de forma que no arquivo views/people/index eu tenho acesso a esses dados
    res.render('people/index', { peoples });
}
//================================================================================

module.exports.newPeople = (req, res) => {    
    res.render('people/new');
}

