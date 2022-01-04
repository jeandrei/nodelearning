module.exports.exemploMiddleware = (req, res, next) => {
    console.log('Middleware executada do arquivo middleware.js');
    next();
}


module.exports.verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if(password === 'secret'){
       console.log(req.query);
       next();
    } else {
       res.send('Desculpe você não tem permissão');
    }
   
 }

