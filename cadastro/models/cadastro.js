const mongoose = require('mongoose');

//Dou um require nas funções de validação descomente as linhas validate para ativar a validação
const Valida = require('../public/javascripts/valida');

const cadastroSchema = new mongoose.Schema({
    cadastroNome: {
        type: String,
        required: [true, 'Nome é um campo obrigatório'],
        minlength: [4, 'Nome precisa ter no mínimo 4 caracteres, você informou {VALUE}'],
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
    },
    cadastroTelefone: {
        type: String,
        required: [true, 'Telefone é um campo obrigatório'],
        validate: [Valida.validaTelefone, 'Telefone inválido']
        
    },
    cadastroBairro: {
        type: String        

    },
    cadastroRua: {
        type: String
    },
    cadastroNumero: {
        type: Number
    },
    cadastroComplemento: {
        type: String
    }
});

const Cadastro = mongoose.model('Cadastro', cadastroSchema);

module.exports = Cadastro;