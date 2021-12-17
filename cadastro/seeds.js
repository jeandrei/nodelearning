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
        cadastroNome: 'Jeandrei Walter',
        cadastroCpf: '004.620.059-25',  
        cadastroEmail: 'jean@gmail.com',
        cadastroCelular: '(47)99116-9267',
        cadastroTelefone: '(47)3345-4025',
        cadastroBairro: 'Bairro teste',
        cadastroRua: 'Rua teste',
        cadastroNumero: '66',
        cadastroComplemento: 'Casa'
    },
    {
        cadastroNome: 'Usuario 01',
        cadastroCpf: '11111101',  
        cadastroEmail: 'usuario01@gmail.com',
        cadastroCelular: '111111101',
        cadastroTelefone: '11111101',
        cadastroBairro: 'Bairro 01',
        cadastroRua: 'Rua 01',
        cadastroNumero: '01',
        cadastroComplemento: 'Casa 01'
    },
    {
        cadastroNome: 'Usuario 02',
        cadastroCpf: '11111102',  
        cadastroEmail: 'usuario02@gmail.com',
        cadastroCelular: '111111102',
        cadastroTelefone: '11111102',
        cadastroBairro: 'Bairro 02',
        cadastroRua: 'Rua 02',
        cadastroNumero: '02',
        cadastroComplemento: 'Casa 02'
    },
    {
        cadastroNome: 'Usuario 03',
        cadastroCpf: '11111103',  
        cadastroEmail: 'usuario03@gmail.com',
        cadastroCelular: '111111103',
        cadastroTelefone: '11111103',
        cadastroBairro: 'Bairro 03',
        cadastroRua: 'Rua 03',
        cadastroNumero: '03',
        cadastroComplemento: 'Casa 03'
    },
    {
        cadastroNome: 'Usuario 04',
        cadastroCpf: '11111104',  
        cadastroEmail: 'usuario04@gmail.com',
        cadastroCelular: '111111104',
        cadastroTelefone: '11111104',
        cadastroBairro: 'Bairro 04',
        cadastroRua: 'Rua 04',
        cadastroNumero: '04',
        cadastroComplemento: 'Casa 04'
    },
    {
        cadastroNome: 'Usuario 05',
        cadastroCpf: '11111105',  
        cadastroEmail: 'usuario05@gmail.com',
        cadastroCelular: '111111105',
        cadastroTelefone: '11111105',
        cadastroBairro: 'Bairro 05',
        cadastroRua: 'Rua 05',
        cadastroNumero: '05',
        cadastroComplemento: 'Casa 05'
    },
    {
        cadastroNome: 'Usuario 06',
        cadastroCpf: '11111106',  
        cadastroEmail: 'usuario06@gmail.com',
        cadastroCelular: '111111106',
        cadastroTelefone: '11111106',
        cadastroBairro: 'Bairro 06',
        cadastroRua: 'Rua 06',
        cadastroNumero: '06',
        cadastroComplemento: 'Casa 06'
    },
    {
        cadastroNome: 'Usuario 07',
        cadastroCpf: '11111107',  
        cadastroEmail: 'usuario07@gmail.com',
        cadastroCelular: '111111107',
        cadastroTelefone: '11111107',
        cadastroBairro: 'Bairro 07',
        cadastroRua: 'Rua 07',
        cadastroNumero: '07',
        cadastroComplemento: 'Casa 07'
    },
    {
        cadastroNome: 'Usuario 08',
        cadastroCpf: '11111108',  
        cadastroEmail: 'usuario08@gmail.com',
        cadastroCelular: '111111108',
        cadastroTelefone: '11111108',
        cadastroBairro: 'Bairro 08',
        cadastroRua: 'Rua 08',
        cadastroNumero: '08',
        cadastroComplemento: 'Casa 08'
    },
    {
        cadastroNome: 'Usuario 09',
        cadastroCpf: '11111109',  
        cadastroEmail: 'usuario09@gmail.com',
        cadastroCelular: '111111109',
        cadastroTelefone: '11111109',
        cadastroBairro: 'Bairro 09',
        cadastroRua: 'Rua 09',
        cadastroNumero: '09',
        cadastroComplemento: 'Casa 09'
    },
    {
        cadastroNome: 'Usuario 10',
        cadastroCpf: '11111110',  
        cadastroEmail: 'usuario10@gmail.com',
        cadastroCelular: '111111110',
        cadastroTelefone: '11111110',
        cadastroBairro: 'Bairro 10',
        cadastroRua: 'Rua 10',
        cadastroNumero: '10',
        cadastroComplemento: 'Casa 10'
    },
    
]

Cadastro.insertMany(seedCadastro)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })