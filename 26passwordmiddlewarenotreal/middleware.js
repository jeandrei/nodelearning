module.exports.exemploMiddleware = (req, res, next) => {
    console.log('Middleware executada do arquivo middleware.js');
    next();
}


//=============================MIDDLEWARE PARA VERIFICAR PASSWORD=============
module.exports.verifyPassword = (req, res, next) => {
    //será executada sempre
    //se colocar na url http://ip:porta/cadastros/secret?variavel=valor
    //será apresentado no console
    //nesse caso estamos verificando a variável password
    //então na url temos que colocar ip:porta/cadastros/secret?password=secret
    const { password } = req.query;
    //se o password for igual a secret
    if(password === 'secret'){
       //continuamos o código com next
       console.log(req.query);
       next();
    } else {
       //caso contrário paramos a execução e mandamos a menságem para o usuário
       res.send('Desculpe você não tem permissão');
    }
   
 }