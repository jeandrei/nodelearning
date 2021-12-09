/*
 * OBS.: PARA PODER FAZER FUNCIONAR COMO A VIDEOAULA
 * TIVE QUE MUDAR OS NAMES DOS INPUTS DO FORMULÁRIO
 * SEGUINDO O PADRÃO
 * people[first_name], people[last_name] e people[score]
 * pq caso contrário lá na schema do joi ele não da certo nessa linha
 * people: Joi.object({
 * pois não aparece people no req.body
 * Para testar sempre no controller de um console.log(req.body);
 * a saida tem que ser algo assim
 * people: { first_name: 'joao', last_name: 'carlos', score: '5' } }
 * Com essa alteração tive que dar um destruct lá no controller update people
 * People.findByIdAndUpdate(id, { ...req.body.people }
 * 
 * Validação server side com joi validator
 * fonte: https://joi.dev/api/?v=17.5.0
 * Instalamos o joi
 * npm install joi --save
 * Agora vamos criar uma middleware para validação de cada ator
 * exemplo validatePeople, poderia ter validateUser assim por diante
 * Na raiz do sistema criamos um arquivo schemas.js
 * o route da um require no middleware.js que por sua vez
 * da um require no schemas.js
 * no schemas.js damos um require no joi
 * A sequencia de criação é
 * Crie o arquivo schemas.js na raiz do app
 * Dentro do schemas.js crie a validação do joi
 * Dentro do arquivo middleware crie uma middleware de validação
 * validatePeople
 * e por último chame essa middleware no arquivo de rota routes/peoples
 */


require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');



app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));



//===================================ROTAS=============================================
const People = require('./models/people');
const peoples = require('./routes/peoples');
app.use('/peoples', peoples);
//======================================================================================






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



app.all('*', (req, res, next) => {
   next(new ExpressError('Página não encontrada', 404));
});



app.use((err,req, res, next) => {  
   const { statusCode = 500 } = err;
   if(!err.message) err.message = 'Oh No, Something Went Wrong!';
   res.status(statusCode).render('error', { err });   
})


const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})