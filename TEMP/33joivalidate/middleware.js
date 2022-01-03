//===========================require no joi schema=======================
const { peopleSchema } = require('./schemas.js');
//e no ExpressError
const ExpressError = require('./utils/ExpressError');
//=======================================================================

module.exports.exemploMiddleware = (req, res, next) => {
    console.log('Middleware executada do arquivo middleware.js');
    next();
}


module.exports.verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if(password === 'secret'){
       //console.log(req.query);
       next();
    } else {
       throw new Error('Password required!');
    }
   
 }

 //middleware para validar backend people a schema está em schemas.js
module.exports.validatePeople = (req, res, next) => {  
   //console.log(req);
   const { error } = peopleSchema.validate(req.body);
   if(error){
       //cria uma unica linha com a mensagem de erro
       const msg = error.details.map(el => el.message).join(',');
       throw new ExpressError(msg, 400);
   } else {
       next();
   }
}

