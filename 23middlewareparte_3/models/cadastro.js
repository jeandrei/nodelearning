const mongoose = require('mongoose');

const Valida = require('../public/javascripts/valida');

const cadastroSchema = new mongoose.Schema({
    cadastroNome: {
        type: String,
        required: [true, 'Nome é um campo obrigatório'],
        minlength: [4, 'Nome precisa ter no mínimo 4 caracteres, você informou {VALUE}']
    },
    cadastroCpf: {
        type: String,
        required: [true, 'CPF é um campo obrigatório'],
        validate: [Valida.validaCPF, 'CPF inválido']      

    },
    cadastroEmail: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email é obrigatório'],
        validate: [Valida.validaEmail, 'Informe um email válido']       
    },
    cadastroCelular: {
        type: String,        
        required: [true, 'Celular é um campo obrigatório'],
        validate: [Valida.validaTelefone, 'Celular inválido'] 
    }       
});


const Cadastro = mongoose.model('Cadastro', cadastroSchema);

module.exports = Cadastro;
