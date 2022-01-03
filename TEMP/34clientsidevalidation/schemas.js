
const Joi = require('joi');


 module.exports.peopleSchema = Joi.object({
    people: Joi.object({
        first_name: Joi.string().trim().min(3).required().messages({
            "string.base": `"First Name" tem que ser um texto`,
            "string.empty": `"First Name" não pode ser vazio`,
            "string.min": `"First Name" tem que ter no mínimo 3 caracteres`,
            "any.required": `"First Name" é um campo obrigatório.`,
          }),
        last_name: Joi.string().trim().min(3).required().messages({
            "string.base": `"Last Name" tem que ser um texto`,
            "string.empty": `"Last Name" não pode ser vazio`,
            "any.required": `"Last Name" é um campo obrigatório.`,
          }),
        score: Joi.number().required().min(0).messages({
            "number.base": `"Score" tem que ser um número de 0 a 10`,
            "number.min": `"Score" não pode ser menor que 0`,
            "number.max": `"Score" não pode ser maior que 10`,
            "string.empty": `"Score" não pode ser vazio`,
            "any.required": `"Score" é um campo obrigatório.`,
          }),     
    }).required()    
}); 

