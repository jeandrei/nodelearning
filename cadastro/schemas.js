const Joi = require('joi');

 //.trim para evitar passar apensa com um espaço em branco
 module.exports.cadastroSchema = Joi.object({
    cadastro: Joi.object({
        cadastroNome: Joi.string().trim().min(3).required().messages({
            "string.base": `"Nome" tem que ser um texto`,
            "string.empty": `"Nome" não pode ser vazio`,
            "string.min": `"Nome" tem que ter no mínimo 3 caracteres`,
            "any.required": `"Nome" é um campo obrigatório.`,
          }),
          cadastroCpf: Joi.string().min(14).max(14).required().messages({
            "string.base": `"CPF" tem que ser um número`,
            "string.empty": `"CPF" não pode ser vazio`,
            "string.min": `"CPF" tem que ter 14 números`,
            "string.max": `"CPF" não pode ter mais que 14 números`,
            "any.required": `"CPF" é um campo obrigatório.`,
          }),
          cadastroEmail: Joi.string().trim().required().min(3).messages({
            "string.base": `"Email" tem que ser um texto`,
            "string.min": `"Email" tem que ter ao menos três caracteres`,            
            "string.empty": `"Email" não pode ser vazio`,
            "any.required": `"Email" é um campo obrigatório.`,
          }),     
    }).required()    
}); 