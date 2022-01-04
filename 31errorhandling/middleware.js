module.exports.exemploMiddleware = (req, res, next) => {
    console.log('Middleware executada do arquivo middleware.js');
    next();
}

//=============================MIDDLEWARE PARA VERIFICAR PASSWORD=============
module.exports.verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if(password === 'secret'){
       console.log(req.query);
       next();
    } else {
       //===================================================
       //vai ocasionar um erro mas a primeira linha é a mensagem
       throw new Error('Password required!');
       //===================================================
    }   
 }
 //============================================================================