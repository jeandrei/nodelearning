const mongoose = require('mongoose');



const pessoaSchema = new mongoose.Schema({
    pessoaNome: {
        type: String,
        required: true
    },
    pessoaSobrenome: {
        type: String,
        required: true
    },
    pessoaIdade: {
        type: Number,
        required: true,
        min: 0
    },
    pessoaEndereco: {
        type: String,
        required: true
    },
    pessoaNaturalidade: {
        type: String,
        required: true
    }
});

const Pessoa = mongoose.model('Pessoa', pessoaSchema);

module.exports = Pessoa;