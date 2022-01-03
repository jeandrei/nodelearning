//======================TEM QUE DAR UM REQUIRE NO MONGOOSE===============
const mongoose = require('mongoose');
//=======================================================================


//==============================CRIA A SCHEMA============================
//aula 397 se quiser definir os valores que podem ser informados enum: ['val','val2','val3']
const cadastroSchema = new mongoose.Schema({
    cadastroNome: {
        type: String,
        required: [true, 'Nome é um campo obrigatório'],
        minlength: [4, 'Nome precisa ter no mínimo 4 caracteres, você informou {VALUE}']
    },
    cadastroCpf: {
        type: String,
        required: [true, 'CPF é um campo obrigatório']      

    },
    cadastroEmail: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email é obrigatório']       
    },
    cadastroCelular: {
        type: String,        
        required: [true, 'Celular é um campo obrigatório'] 
    }       
});


//============================COMPILAMOS O MODEL===========================
//Tem que ser com a primeira letra em maiúscula 
const Cadastro = mongoose.model('Cadastro', cadastroSchema);
//=========================================================================

//============================EXPORTAMOS O MODEL===========================
module.exports = Cadastro;
//=========================================================================

//AGORA BASTA DAR UM REQUIRE NO MODEL NO APP.JS