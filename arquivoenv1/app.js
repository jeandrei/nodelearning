/**
 * 1 - Instala o pacote dotenv - npm install dotenv - fonte https://www.npmjs.com/package/dotenv
 * 2 - da um require no dotenv - require('dotenv').config();
 * 3 - Cria o arquivo .env
 * 4 - Cria as variaveis com valores secretos exemplo SECRETO=teste
 * 5 - Utiliza a variavel no código process.env.SECRETO
 */

require('dotenv').config();

console.log('Configuração do arquivo .env');
console.log('============================================================================');
const secreto = process.env.SECRETO;
console.log(`O valor que está na variável SECRETO dentro do arquivo .env é: ${ secreto }`);
console.log('============================================================================');
