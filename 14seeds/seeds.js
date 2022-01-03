//==================Damos um require no mongoose=======
const mongoose = require('mongoose');
//=====================================================

//==================IMPORTAMOS O MODEL=================
const Cadastro = require('./models/cadastro');
//=====================================================

//================CONECTAMOS AO MOGOOSE================
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
//=====================================================

//Cria uma constante d com um novo objeto Cadastro que importamos do model
//Passando os valores
const d = new Cadastro({
    cadastroNome: 'Jose da Silva', 
    cadastroCpf: '009897897',
    cadastroEmail: 'jose@gmail.com',
    cadastroCelular: '470098766'
});


/*Salvamos no banco de dados
para verificar se salvou mesmo no mongoose
show dbs
verifique se criou o banco cadastrodb
use cadastro
show collection
db.cadastros.find({})
*/
d.save()
.then(d => {
    console.log(d)
})
.catch(e => {
    console.log(e)
}) 