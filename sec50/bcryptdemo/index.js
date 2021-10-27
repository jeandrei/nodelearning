/**
 * Depende da instalação do bcrypt
 * npm i bcrypt Aula 496
 */

//require bcrypt
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    /**
     * vai encriptografar o password e 
     * vai demorar 12 miliseconds porém é uma boa prática
     * ir aumentando esse valor para evitar o uso de ferramentas
     * para descobrir a senha, quando maior o número
     * mais demorado vai ser para cada comparação
     * salt vamos adicionar ao password
     * dessa forma se o usuário colocar a senha 1234 essa será formada 
     * pela senha + salt exemplo 1234$2b$10$ykb1aD/sfA8.Y0l81dAB/O
     * assim fica mais difícil quebrar a senha
     */  
    const salt = await bcrypt.genSalt(12);
    //faz e criptografia e adiciona o salt
    const hash = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hash);
};


//SE PREFERIR PODE APENAS USAR ESSAS LINHAS DE CÓDIGO PARA FAZER A MESMA COISA DAS LINHAS DE CIMA
/* const hashPassword = async (password) => {     
    const hash = await bcrypt.hash(password, 12);   
    console.log(hash);
}; */


const login = async(password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword)
    if(result){
        console.log("LOGGED YOU IN! SUCCESSFUL MATCH!")
    } else {
        console.log("INCORRECT!")
    }
}

//hashPassword('monkey');
//login('monkey', '$2b$12$SvICc3QAdbPfjRKV7BTpJ.e2pMzXUOVyYQ6899xdgqcMH3A2DL4Sy');

