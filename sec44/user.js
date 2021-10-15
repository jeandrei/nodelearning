
/**
 * Aula 449 One to Few
 */


//conexão com o banco de dados
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sec44',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
   console.log("CONNECTION OPEN!!!");
})
.catch(err => {
   console.log("OH NO ERROR!!!")
   console.log(err);
})


//1 - Cria a Schema
const userSchema = new mongoose.Schema({
    //One
    first: String,
    last: String,
    //Many
    addresses: [
        {   //se não quiser gerar um id basta adicionar a linha abaixo _id: { id: false}
            _id: { id: false },
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
});

//2 - Cria o Model User
const User = mongoose.model('User', userSchema);

//3 - Cria um novo User

const makeUser = async () => {
    //User
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    //address
    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    
    const res = await u.save();
    console.log(res);
}

//Se quisesse poderia criar uma função específica para adicionar os addresses
const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '99 3rd St.',
            city: 'New York',
            state: 'NY',
            country: 'USA' 
        }
    )
    const res = await user.save();
    console.log(res);
}


//4 - Chama makeUser
makeUser();

//5 - Para adicionar um address usando a função addAddress copie um id do banco para funcionar
addAddress('6169de35dbda4941af3edf65');
