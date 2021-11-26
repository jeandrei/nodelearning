/**
 * Para que na hora de realizar um git não seja feito o upload de dados confidenciais que estão 
 * no arquivo .env e também para não fazer o upload da pasta node_modules que não é necessário
 * pois esse diretório será criado com o comando npm install
 * 
 * 1 - Na raiz do sistema crie um arquivo .gitignore
 * 2 - Dentro do arquivo coloque: 
 * node_modules
 * .env
 */


console.log('Configuração do arquivo .gitignore');
console.log('============================================================================');
console.log(`Os conteúdos informados no arquivo .gitignore não serão enviados para o github`);
console.log('============================================================================');
