//======================TEM QUE DAR UM REQUIRE NO MONGOOSE===============
const mongoose = require('mongoose');
//=======================================================================


//==============================CRIA A SCHEMA============================
//aula 397 se quiser definir os valores que podem ser informados enum: ['val','val2','val3']
const peopleSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    }, 
    last_name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 0
    }        
});
//=========================================================================

//============================COMPILAMOS O MODEL===========================
//Tem que ser com a primeira letra em maiúscula 
const People = mongoose.model('People', peopleSchema);
//=========================================================================

//============================EXPORTAMOS O MODEL===========================
module.exports = People;
//=========================================================================

//AGORA BASTA DAR UM REQUIRE NO MODEL NO APP.JS
