const joiErrorFormatter = (rowErrors) => {    
    const errors = {};
    const details = rowErrors.details;
    details.map(d => {
        errors[d.path[1]] = [d.message]
    });
return errors;
}

const mongooseErrorFormatter = (rowErrors) => {   
    const errors = {};
    const details = rowErrors.errors;
    console.log(rowErrors);
    for(const key in details) {
       errors[key] = [details[key].message];
    }
return errors;
}

module.exports = { joiErrorFormatter, mongooseErrorFormatter };


/**
 * Teste ambas as saidas aqui
 * https://codebeautify.org/jsonviewer
 * Clique em beauty
 * a saida de ambos tem que ser igual
 * 
 * {
  "cadastroNome": [
    "Nome é um campo obrigatório"
  ],
  "cadastroCpf": [
    "CPF é um campo obrigatório"
  ],
  "cadastroEmail": [
    "Email é obrigatório"
  ],
  "cadastroCelular": [
    "Celular é um campo obrigatório"
  ],
  "cadastroTelefone": [
    "Telefone é um campo obrigatório"
  ]
}
 * 
 * 
 * 
 * 
 */