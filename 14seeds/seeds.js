//==================Damos um require no mongoose=======
const mongoose = require('mongoose');
//=====================================================

//==================IMPORTAMOS O MODEL=================
const People = require('./models/people');
//=====================================================

//================CONECTAMOS AO MOGOOSE================
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
//=====================================================

//Cria uma constante p com um novo objeto People que importamos do model
//Passando os valores
const p = new People({
    first_name: 'Jeandrei', 
    last_name: 'Walter',
    score: 10
});


/*Salvamos no banco de dados
para verificar se salvou mesmo no mongoose
show dbs
verifique se criou o banco testdb
use testdb
show collection
db.peoples.find({})
*/
p.save()
.then(p => {
    console.log(p)
})
.catch(e => {
    console.log(e)
}) 