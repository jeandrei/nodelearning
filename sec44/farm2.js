/**
 * Aula 450-451 One to Many
 */


//conexão com o banco de dados
const mongoose = require('mongoose');
// para não precisar fazer mongoose.Schema criamos a constante Schema abaixo
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/teste1',{ useNewUrlParser: true, useUnifiedTopology: true })
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
        enum: ['Primavera', 'Verão', 'Outono', 'Inverno']
    }
});

//2 - Cria o model Product
const Product = mongoose.model('Product', productSchema);


const insertProducts = async () => {
    //ABACAXI
    const abacaxi = await Product.findOne({ name: 'Abacaxi' });
    if(!abacaxi){
        const abacaxi = new Product({ name: 'Abacaxi', price: 4.99, season: 'Verão' });   
        await abacaxi.save();
        console.log(abacaxi);
    } else {
        console.log('Já existe registro para Abacaxi');
    }
    //MAMÃO
    const mamao = await Product.findOne({ name: 'Mamão' });
    if(!mamao){
        const mamao = new Product({ name: 'Mamão', price: 4.99, season: 'Verão' });   
        await mamao.save();
        console.log(mamao);
    } else {
        console.log('Já existe registro para Mamão');
    }
     //ABACATE
     const abacate = await Product.findOne({ name: 'Abacate' });
     if(!abacate){
         const abacate = new Product({ name: 'Abacate', price: 3.99, season: 'Primavera' });   
         await abacate.save();
         console.log(abacate);
     } else {
         console.log('Já existe registro para Abacate');
     }
     //TOMATE
     const tomate = await Product.findOne({ name: 'Tomate' });
     if(!tomate){
         const tomate = new Product({ name: 'Tomate', price: 0.99, season: 'Outono' });   
         await tomate.save();
         console.log(tomate);
     } else {
         console.log('Já existe registro para Tomate');
     }
      //ALFACE
      const alface = await Product.findOne({ name: 'Alface' });
      if(!alface){
          const alface = new Product({ name: 'Alface', price: 0.90, season: 'Verão' });   
          await alface.save();
          console.log(alface);
      } else {
          console.log('Já existe registro para Alface');
      }
      //ABOBRINHA
      const abobrinha = await Product.findOne({ name: 'Abobrinha' });
      if(!abobrinha){
          const abobrinha = new Product({ name: 'Abobrinha', price: 1.99, season: 'Primavera' });   
          await abobrinha.save();
          console.log(abobrinha);
      } else {
          console.log('Já existe registro para Abobrinha');
      }
      //TANBERINA
      const tangerina = await Product.findOne({ name: 'Tangerina' });
      if(!tangerina){
          const tangerina = new Product({ name: 'Tangerina', price: 2.99, season: 'Inverno' });   
          await tangerina.save();
          console.log(tangerina);
      } else {
          console.log('Já existe registro para Tangerina');
      }
}

insertProducts();


const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]

});

//5 - Criamos o model de farm
const Farm = mongoose.model('Farm', farmSchema);

//6 - Criamos uma farm
 const makeFarm = async () => {
    const farm = await Farm.findOne({ name: 'Fazenda da tia' });
    if(!farm){
        const farm = new Farm({ name: 'Fazenda da tia', city: 'Guinda, CA' });   
        await farm.save();
        console.log(farm);
    } else {
        console.log('Farm Fazenda da tia já existe');
    }
   
}

makeFarm();

const addProduct = async () => {
    //1º localizo a farm onde quero adicionar um product e salvo na constante farm
    const farm = await Farm.findOne({ name: 'Fazenda da tia' });
    //2º localizo o produto que quero salvar em Farm/products e salvo na constante watermelon
    const tomate = await Product.findOne({ name: 'Tomate'});
    //3º salvo o product na tabela Farm/products
    farm.products.push(tomate);
    await farm.save();
    console.log(farm);
}

//addProduct();

Farm.findOne({ name: 'Fazenda da tia' })
.populate('products')
.then(farm => console.log(farm));
