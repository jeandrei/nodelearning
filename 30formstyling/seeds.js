const mongoose = require('mongoose');

const Cadastro = require('./models/cadastro');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cadastrodb';
mongoose.connect(dbUrl,{ 
   useNewUrlParser: true, 
   useUnifiedTopology: true    
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});


const seedCadastro = [
    {
        cadastroNome: 'Jeandrei Walter',
        cadastroCpf: '5465465465',  
        cadastroEmail: 'jean@gmail.com',
        cadastroCelular: '(47)99116-8745'       
    },
    {
        cadastroNome: 'Usuario 01',
        cadastroCpf: '11111101',  
        cadastroEmail: 'usuario01@gmail.com',
        cadastroCelular: '111111101'        
    },
    {
        cadastroNome: 'Usuario 02',
        cadastroCpf: '11111102',  
        cadastroEmail: 'usuario02@gmail.com',
        cadastroCelular: '111111102'       
    },
    {
        cadastroNome: 'Usuario 03',
        cadastroCpf: '11111103',  
        cadastroEmail: 'usuario03@gmail.com',
        cadastroCelular: '111111103'        
    },
    {
        cadastroNome: 'Usuario 04',
        cadastroCpf: '11111104',  
        cadastroEmail: 'usuario04@gmail.com',
        cadastroCelular: '111111104',        
    },
    {
        cadastroNome: 'Usuario 05',
        cadastroCpf: '11111105',  
        cadastroEmail: 'usuario05@gmail.com',
        cadastroCelular: '111111105'        
    },
    {
        cadastroNome: 'Usuario 06',
        cadastroCpf: '11111106',  
        cadastroEmail: 'usuario06@gmail.com',
        cadastroCelular: '111111106'        
    },
    {
        cadastroNome: 'Usuario 07',
        cadastroCpf: '11111107',  
        cadastroEmail: 'usuario07@gmail.com',
        cadastroCelular: '111111107'        
    },
    {
        cadastroNome: 'Usuario 08',
        cadastroCpf: '11111108',  
        cadastroEmail: 'usuario08@gmail.com',
        cadastroCelular: '111111108'        
    },
    {
        cadastroNome: 'Usuario 09',
        cadastroCpf: '11111109',  
        cadastroEmail: 'usuario09@gmail.com',
        cadastroCelular: '111111109'        
    },
    {
        cadastroNome: 'Usuario 10',
        cadastroCpf: '11111110',  
        cadastroEmail: 'usuario10@gmail.com',
        cadastroCelular: '111111110'        
    }
    
];

Cadastro.insertMany(seedCadastro)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(e);
});