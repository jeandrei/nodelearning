//Monogoose
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/cadastrodb';

//cadastroSchema
const Cadastro = require('./models/cadastro');

//Conexão com o banco de dados
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedCadastro = [
    {
        cadastroNome: 'Jeandrei Walter3',
        cadastroCpf: '0046200592',  
        cadastroEmail: 'jeandrei3gmail',
        cadastroCelular: '(47)99116-926',
        cadastroTelefone: '(47)3345-402',
        cadastroBairro: 'Bairro teste',
        cadastroRua: 'Rua teste',
        cadastroNumero: '66',
        cadastroComplemento: 'Casa'
    } 
    
]

Cadastro.insertMany(seedCadastro)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })