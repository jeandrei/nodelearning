/**
 * Aula 450-451 One to Many
 */


//conexão com o banco de dados
const mongoose = require('mongoose');
// para não precisar fazer mongoose.Schema criamos a constante Schema abaixo
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/sec44',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
   console.log("CONNECTION OPEN!!!");
})
.catch(err => {
   console.log("OH NO ERROR!!!")
   console.log(err);
})

//1 - Cria a Schema
const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        //enum só permite esses valores
        enum: ['Sprint', 'Summer', 'Fall', 'Winter']
    }
});

//2 - Cria o model Product
const Product = mongoose.model('Product', productSchema);

//3- Insere alguns registros na tabela Product
//Esses products serão inseridos em Farm/products insertMany comentado para não inserir cada vez que executa
//descomente para inserir os registros a primeira vez
/* Product.insertMany([
    { name: 'Goddess Melon', price: 4.99, season: 'Summer'},
    { name: 'Goddess Baby Watermelon', price: 4.99, season: 'Summer'},
    { name: 'Asparagus', price: 3.99, season: 'Summer'},

]); */

//4 - Criamos a Schema do farm
//A tabela farm tem um array products aqui que se refere o um para vários
//uma Farm pode ter vários products
//então criamos uma farm e depois adicionamos os products dessa farm
// como se fosse 
//Product Tomate, Cenoura, Alface
//Farm Vegetais
//então Vegetais [Tomate,Cenoura,Alface]
const farmSchema = new Schema({
    name: String,
    city: String,
    //aqui como cada products terá um registro precisamos transformálo em um objeto object id
    //procure em mongoose populate
    // para não ter que colocar assim products: [{type: mongoose.Schema.Types.ObjectId}]
    // criamos uma constante lá em cima Schema = mongoose.Schema 
    // que pode ser definida assim const { Schema } = mongoose, daí podemos fazer apenas
    //Schema.Types.ObjectId    
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]

});

//5 - Criamos o model de farm
const Farm = mongoose.model('Farm', farmSchema);


//6 - Criamos uma farm
/* const makeFarm = async () => {
    const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA' });
    const melon = await Product.findOne({ name: 'Goddess Melon' });
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
}

makeFarm(); */

//Insere um product em Farm/products
const addProduct = async () => {
    //1º localizo a farm onde quero adicionar um product e salvo na constante farm
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    //2º localizo o produto que quero salvar em Farm/products e salvo na constante watermelon
    const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon'});
    //3º salvo o product na tabela Farm/products
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
}

//addProduct();

//populate aula 451 para ver os products dentro do array, caso contrário será apresentado
//apenas os ids
Farm.findOne({ name: 'Full Belly Farms' })
.populate('products')
.then(farm => console.log(farm));


