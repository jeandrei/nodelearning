const mongoose = require('mongoose');
const Pessoa = require('./models/pessoas');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/testedb';
mongoose.connect(dbUrl,{ 
   useNewUrlParser: true, 
   useUnifiedTopology: true    
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});

const seedPessoas = [
    {
        pessoaNome: 'Jeandrei',
        pessoaSobrenome: 'Walter',
        pessoaIdade: 41,
        pessoaEndereco: 'Rua manoel tolentino',
        pessoaNaturalidade: 'Rio Negrinho'
    }, 
    {
        pessoaNome: 'Maricleia',
        pessoaSobrenome: 'Walter',
        pessoaIdade: 35,
        pessoaEndereco: 'Rua manoel tolentino 2',
        pessoaNaturalidade: 'Jaragua do Sul'
    }, 
    {
        pessoaNome: 'Dexter',
        pessoaSobrenome: 'Safado',
        pessoaIdade: 12,
        pessoaEndereco: 'Em todos os comodos da casa',
        pessoaNaturalidade: 'Penha'
    }, 
    {
        pessoaNome: 'Biju',
        pessoaSobrenome: 'Sapeca',
        pessoaIdade: 3,
        pessoaEndereco: 'Onde tiver um brinquedo',
        pessoaNaturalidade: 'Rio Negrinho'
    }, 
];

Pessoa.insertMany(seedPessoas)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })