/**
 * Aula 452 One to Bajilions
 */


//conexão com o banco de dados
const mongoose = require('mongoose');
// para não precisar fazer mongoose.Schema criamos a constante Schema abaixo
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/tweets',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
   console.log("CONNECTION OPEN!!!");
})
.catch(err => {
   console.log("OH NO ERROR!!!")
   console.log(err);
})

const userSchema = new Schema({
    username: String,
    age: Number
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    //referência com o model User aqui teremos um relacionamento um tweet pertence a um user
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})


const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);


//1 - Crio o usuário se ele não existe
const makeUser = async () => {
    const user = await User.findOne({ username: 'chickenfan99' });
    if(!user){
        const user = new User({ username: 'chickenfan99', age: 61 });
        user.save();
    } else {
        console.log('usuário já existe');
    }
}
makeUser();

 const makeTweets = async () => {
    const user = await User.findOne({ username: 'chickenfan99' });
    if(!user){
        console.log('usuário não existe')
    } else {
        const tweet1 = new Tweet({ text: 'Tweet teste novo!', likes: 0 });
        tweet1.user = user;        
        tweet1.save();
        console.log('Tweet adicionado!');
    }
   
}

makeTweets(); 

//user é o campo que eu quero populate é campo e não model lá do tweetSchema
//se quiser que traga todos os campos de user deixa só user, se quiser só uma propriedade
//coloca depois da virgula como exemplo username
const findTweet = async () => {
    const t = await Tweet.find({}).populate('user', 'username');
    console.log(t);
}

findTweet();