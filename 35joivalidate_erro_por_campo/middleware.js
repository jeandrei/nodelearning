const { cadastroSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');

//==========================================================================================
 const { joiErrorFormatter, mongooseErrorFormatter } = require('./utils/validationFormatter');
//==========================================================================================

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
       throw new Error('Password required!');
    }   
 }


module.exports.validateCadastro = (req, res, next) => {  
   const { error } = cadastroSchema.validate(req.body);
   if(error){
       const msg = error.details.map(el => el.message).join(',');
       throw new ExpressError(msg, 400);
   } else {
       next();
   }
}




//======================================================================
//como usa validaSchema(schemaparavalidar, 'para/onder/redirecionar')
module.exports.validaSchema = (schema, redirect) => {  
    return (req, res, next) => {    
       const validationResult = schema.validate(req.body, {
          abortEarly: false
       });   
        
       if(validationResult.error){       
          res.render(redirect, { 
             cadastro:{
                _id:req.params.id
             },
             message: {
                type: 'error',
                body: 'Validation Error'
             },
             errors: joiErrorFormatter(validationResult.error),
             formData: req.body.cadastro
             });
       
       
          } else {
             errors = {};
             next();
          } 
 
    }//return
 
 }//module.exports
 //===============================================================================



//======================================================================
//como usa validaSchema(schemaparavalidar, 'para/onder/redirecionar')
module.exports.validaSchema2 = (schema, redirect) => {  
    return (req, res, next) => {    
       const validationResult = schema.validate(req.body, {
          abortEarly: false
       });
    
       //se tem id quer dizer que é uma atualização
       if(req.params.id){
          const { id } = req.params;  
          if(validationResult.error){ 
             res.render(redirect, { 
                cadastro:{
                   _id:id
                },
                message: {
                   type: 'error',
                   body: 'Validation Error'
                },
                errors: joiErrorFormatter(validationResult.error),
                formData: req.body.cadastro
             });          
          } else {
             errors = {};
             next();
          }//else req.params.id
       
       //caso não tenha id é um registro novo
       } else {//if(req.params.id)
          if(validationResult.error){       
             res.render(redirect, { 
                message: {
                   type: 'error',
                   body: 'Validation Error'
                },
                errors: joiErrorFormatter(validationResult.error),
                formData: req.body.cadastro
                });
          
          
             } else {
                errors = {};
                next();
             }
       }//else if req.params.id
    }//return
 }//module.exports
 //===============================================================================
 