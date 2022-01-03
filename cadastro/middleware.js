
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


 //middleware para validar backend people a schema está em schemas.js
 //abortEarly: false vai impedir que a validação encerre no primeiro erro
 //assim validando tudo independente dos erros encontrados na validação
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