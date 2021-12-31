const Joi = require('joi');

//Adiciona as funções de validação=====================================================================
const Valida = require('./public/javascripts/valida');
//=====================================================================================================

 //.trim para evitar passar apensa com um espaço em branco
 module.exports.cadastroSchema = Joi.object({
    cadastro: Joi.object({
        cadastroNome: Joi.string().trim().min(3).required().messages({
            "string.base": `"Nome" tem que ser um texto`,
            "string.empty": `"Nome" não pode ser vazio`,
            "string.min": `"Nome" tem que ter no mínimo 3 caracteres`,
            "any.required": `"Nome" é um campo obrigatório.`,
          }),
          cadastroCpf: Joi
          .required()          
          //====================================================================================================================================================================
          //em .costum value é o valor passado pelo post helper acho que é o erro Valixa.validaCPF é a função de validação javascript que posso usar em ambos backend e frontend
          .custom((value, helper) => {
            if(!Valida.validaCPF(value)){
              return helper.message("CPF Inválido");
            } else {
              return true;
            }
          })
          //===================================================================================================================================================================
          .messages({            
            "string.empty": `"CPF" não pode ser vazio`,            
          }),
          cadastroEmail: Joi.string().trim().required().min(3).messages({
            "string.base": `"Email" tem que ser um texto`,
            "string.min": `"Email" tem que ter ao menos três caracteres`,            
            "string.empty": `"Email" não pode ser vazio`,
            "any.required": `"Email" é um campo obrigatório.`,
          }),     
    }).required()    
}); 