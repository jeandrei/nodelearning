const mongoose = require('mongoose');

const People = require('./models/people');


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/testdb';
mongoose.connect(dbUrl,{ 
   useNewUrlParser: true, 
   useUnifiedTopology: true    
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});


//=======================CRIAMOS UM ARRAY COM OS VALORES PARA INSERIR NO BANCO DE DADOS
const seedPeoples = [
    {
        first_name: 'Dexter', 
        last_name: 'Walter',
        score: 10
    },
    {
        first_name: 'Belinha', 
        last_name: 'Walter',
        score: 9
    },
    {
        first_name: 'Meg', 
        last_name: 'Walter',
        score: 8
    },
    {
        first_name: 'Biju', 
        last_name: 'Walter',
        score: 7
    }
];

//IMPORTANTE se algo não passar na validação nada será inserido
People.insertMany(seedPeoples)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })

//Para popular os dados chame node seeds.js