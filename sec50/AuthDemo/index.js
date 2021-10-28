//Aula 497
//npm i express ejs mongoose bcrypt
/**
 * 1 - Cria o model em /models/user.js
 * 2 - Cria a Schema dentro do /models/user.js * 
 * 3 - Require express
 * 4 - Cria const app = express
 * 5 - Require no model aqui no index const User = require('./models/user');
 * 6 - Conecta com o mongo
 * 7 - Define o view engine para ejs app.set('view engine', 'ejs');
 * 8 - Define a pasta views como padrão para os views app.set('views', 'views');
 * 9 - Precisamos de acesso a req.body (parse) para isso tem que definir o urlencode
 * 9 - Cria a rota para o form register
 * 10 - Cria a rota para o form register
 * 11 - Define a rota do post do formulário app.post
 * 12 - Require no bcrypt const bcrypt = require('bcrypt');
 * 13 - Cria o usuário em app.post
 * 14 - Criar a rota para o formulário de login app.get('/login')
 * 15 - Criar o form para realização do login views/login
 * 16 - Cria a rota app.post('/login') para validar o login
 * 17 - Cria a função para verificar se o usuário está logado
 * em models/user.js userSchema.statics.findAndValidate
 * 17 - Criação da session instala npm i express-session
 * 18 - Require no express-session const session = require('express-session'
 * 19 - define a session com a chave app.use(session({ secret: 'notagoodsecret' }))
 * a session é criada vc pode verificar com o F12 no chrome
 * lá em cima em Application depois no lado esquerdo cookies
 * vai ter o endereço do computador
 * e na lista de cookies vai ter connect.sid
 * 20 - Apos a validação do login criamos uma variável na session
 * req.session.user_id = user._id;
 * fazemos o mesmo para register
 * 21 - Agora para verificarmos se o usuário está logado em qualquer
 * rota podemos fazer o seguinte if(!req.session.user_id){
 * 22 - Log out apenas o que temos que fazer é excluir o session.user_id
 * app.post('/logout') req.session.user_id = null;
 * 23 - Criamos um formulário para efetuar o post logout 
 * ele criou /view secret.ejs
 * 24 - Cria uma middleware requireLogin que sempre vai verificar se o usuário está
 * logado, se não estiver logado redireciona para o login
 * 
 * 
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

//Conexão mongo
mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(session({ secret: 'notagoodsecret' }));

//middleware que vai verificar se o usuário está logado Aula 502
//se o usuário não estiver logado vai redirecionar para o login
//caso contrário continua com o next
const requireLogin = (req, res, next) => {
    if(!req.session.user_id){
        return res.redirect('/login');
    }
    next();
}

app.get('/', (req, res) => {
    res.send('THIS IS THE HOME PAGE');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    //para testar se os dados foram enviados
    //res.send(req.body);
    //pego o username e password enviado
    const { username, password } = req.body;
    //findAndValidate está em models/user.js
    const foundUser = await User.findAndValidate(username, password); 
    //IMPORTANTE na verificação quando o login não passa
    //nunca informar o que está errado, pois facilita para a pessoa mal intencionada
    //simplesmente informe que o login ou a senha estão erradas
    if(foundUser){
        //req.session tem que vim antes do res.send
        req.session.user_id = foundUser._id; 
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
   
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    //para verificar se os dados estão sendo enviados
    //res.send(req.body);
    const { password, username } = req.body;
    //aplicamos a criptografia ao password 12 é o delay, padrão é 12
    //mas quanto maior o número mais demorado é para realizar o hash
    //const hash = await bcrypt.hash(password, 12);
    //para verificar o password criptografado
    //res.send(hash);
    //Salva o usuário no banco de dados
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;    
    res.redirect('/secret');
})

app.post('/logout', (req, res) => {
    //para efetuar o logof poderia simplesmente definir a session.user_id como null
    //req.session.user_id = null;
    //ou se preferir destruir todos os registros da session pode dar um session destroy
    req.session.destroy();
    res.redirect('/login');
})

app.get('/secret', requireLogin, (req, res) => {    
        res.render('secret');        
});

app.get('/topsecret', requireLogin, (req, res) => {    
    res.send("TOP SECRET")      ;
});

app.listen(3000, () => {
    console.log("SERVING YOUR APP!");
})