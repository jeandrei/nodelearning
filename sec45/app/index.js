const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const Product = require('./models/product');
const Farm = require('./models/farm');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))




// FARM ROUTES
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.get('/farms/:id', async (req, res) => {
    //.populate('products'); popula os dados da farmSchema products: [ em farms.js
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm });
})

//aula 461
app.delete('/farms/:id', async (req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    //apos deletar a farm ele executa uma middleware que remove os produtos da farm
    //em models/farm.js/farmSchema.post o método tem que ser igual nos dois se aqui
    //eu chamo findByIdAndDelete na middleware tem que ser findOneAndDelete
    console.log("DELETING!!!!!!")
    res.redirect('/farms');
})

app.post('/farms', async (req, res) => {
    //para verificar se os dados foram enviados use re.send(req.body)
    //mas tem que estar abaixo da linha app.use(express.urlencoded({ extended: true }));
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms')
})

//AULA 459
app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm });
})

app.post('/farms/:id/products', async (req, res) => {
    //id da farm que queremos adicionar um product
    const { id } = req.params;
    //localizamos a farm
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    //aqui está fazendo bidirecional adicionando produto a farm
    farm.products.push(product);
    //e a farm ao produto
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
})





// PRODUCT ROUTES
const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm', 'name');
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})



app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})


