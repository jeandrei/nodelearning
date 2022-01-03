
 const { cadastroSchema } = require('./schemas.js');
 const ExpressError = require('./utils/ExpressError');

 //============================================
 const { joiErrorFormatter, mongooseErrorFormatter } = require('./utils/validationFormatter');

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



















 // middleware para validar backend people a schema está em schemas.js
 // abortEarly: false vai impedir que a validação encerre no primeiro erro
 // assim validando tudo independente dos erros encontrados na validação
module.exports.validaCadastro = (req, res, next) => {  
   //console.log(req);
   const validationResult = cadastroSchema.validate(req.body, {
      abortEarly: false
   });

   if(validationResult.error){       
      res.render('cadastros/new', { 
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
  //================================Teste no joiErrorFormatter===========================
   //res.send(joiErrorFormatter(validationResult.error));
  //=====================================================================================

//next();
/*
   if(!error) return null;

   const errors = {};

   for(let item of error.details){
      errors[item.path[1]] = item.message;      
   }
   console.log(errors);
 */
   /*
   
   if(error){     
       //cria uma unica linha com a mensagem de erro
       const msg = error.details.map(el => el.message).join(',');
       throw new ExpressError(msg, 400);
   } else {
       next();
   }*/
   
}


module.exports.validaSchemaAntigo = (schema, redirect) => {  
   return (req, res, next) => {
      const validationResult = schema.validate(req.body, {
         abortEarly: false
      });
   
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
   }
 }


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



