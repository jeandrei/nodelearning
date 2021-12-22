module.exports.verifyPassword = (req, res, next) => {
    //será executada sempre
    //se colocar na url http://ip:porta/cadastros/secret?variavel=valor
    //será apresentado no console
    //nesse caso estamos verificando a variável password
    //então na url temos que colocar ip:porta?password=secret
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