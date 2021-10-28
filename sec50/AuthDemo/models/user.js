const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
})

//userSchema.statics Aula 503 require bcrypt
userSchema.statics.findAndValidate = async function(username, password){
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}
//bcrypt.compare recebe dois parametros o primeiro é o texto simples sem criptografia
//o segundo é o texto criptografado
//então password é o texto que o usuário digitou
//foundUser.password é o texto criptografado que veio do banco de dados
//como resultado final o bcrypt.compare vai trazer true ou false
//passamos o resultado true or false através do return

//Middleware para fazer o hash no password antes de salvar no bd
//Aula 503
userSchema.pre('save', async function(next) {
    //se o password não tiver sido modificado vá para o next que é seve
    //caso o password foi modificado aí sim faz novamente a criptografia
    if(!this.isModified('password')) return next();
    //faz a criptografia do password
    this.password = await bcrypt.hash(this.password, 12);
    next();//next que é a próxima ação sera save
})
//aplicamos a criptografia ao password 12 é o delay, padrão é 12
//mas quanto maior o número mais demorado é para realizar o hash
   


module.exports = mongoose.model('User', userSchema);