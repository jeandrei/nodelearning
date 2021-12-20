/**
 * Usar a mesma função para validar backend e frontend
 * 1 Cria o arquivo com as funções normalmente usando o javascript na pasta public/javascripts/valida.js
 * 2 Ao final faz a verificação se o que está sendo solicitado é do tipo module e module.exports
 * se sim faz o module.exports com o mesmo nome da função
 * 3 Para usar no backend basta dar um require no model exemplo no models/cadastro.js
 * 4 Para usar no frontend basta chamar pela tag <script> exemplo no views/cadastros/new.js
 * 
 */

//Valida email
function validaEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//Valida telefone fixo e Celular
function validaTelefone(numeroTel) {
    var re = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    return re.test(numeroTel)
};

//Valida CPF
function validaCPF(cpf) {
    var re = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
    return re.test(cpf);
};



//Quando for pelo node faço o module.exports
if(this && typeof module == "object" && module.exports && this === module.exports) {
    module.exports.validaEmail = validaEmail;
    module.exports.validaTelefone = validaTelefone;
    module.exports.validaCPF = validaCPF;   

 }