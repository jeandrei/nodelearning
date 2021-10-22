//intalar:
//npm i express
//npm i express-session
//https://www.npmjs.com/package/express-session

const express = require('express');
const app = express();

//Require na session
const session = require('express-session');


//app.use(session é uma middlewhere
//inside of any route or middlewhere on the request object anytime on incaming request 
//we'll have a session property avaliable
app.use(session({secret: 'thisisnotagoodsecret'}));


app.get('/viewcount', (req, res) => {
    //req.session.count não existe estamos criando aqui
    if(req.session.count){
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }

    res.send(`You have viewd this page ${req.session.count} times`);
})



app.listen(3000, () => {
    console.log('listening on port 3000')
});