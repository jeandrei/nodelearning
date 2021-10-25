//Aula 482

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
//tem que instalar npm i connect-flash 
//depende do express-session para funcionar tem que instalar também
const flash = require('connect-flash');

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));
app.use(flash());
//a partir daqui todos as request passam a ter um método req.flash
//para chamar apenas passamos a chave e a mensagem
//req.flash('info', 'Flash is back!');

const Farm = require('./models/farm')


mongoose.connect('mongodb://localhost:27017/flashDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// FARM ROUTES
/*
middleware que vai adicionar ao objeto res de uma forma que em todos
os templates, todos os views teremos acesso a 
messages executar toda vez enviando a o req.flahs('success')
No express existe uma propriedade chamada locals Response->res.locals
https://expressjs.com/en/4x/api.html#res.locals
*/
app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
})

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms })
})
app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})
app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm })
})

app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    //1 passo a mensagem
    req.flash('success', 'Successfully made a new farm!');
    res.redirect('/farms')
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})



