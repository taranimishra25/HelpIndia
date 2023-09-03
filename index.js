const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product= require('./models/product');
const methodOverride = require('method-override')
const product = require('./models/product');
const bodyParser = require('body-parser')
const ejsMate = require('ejs-mate')



mongoose.connect('mongodb://127.0.0.1:27017/help-india')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connection open!!!!")
})
const app = express();
app.engine('ejs',ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))



app.get('/',(req,res)=>{
    // res.send("hello from HelpIndia")
    res.render('home')
})
app.get('/products',async(req,res)=>{
    const products = await Product.find({});
    res.render('products/index',{products})
})

app.get('/products/new',(req,res)=>{
    res.render('products/new')
})
app.post('/products',async(req,res)=>{
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/products/${product._id}`)
})

app.get('/products/:id',async(req,res)=>{
    const product = await Product.findById(req.params.id)
    res.render('products/show',{product})
})
app.get('/products/:id/edit',async(req,res)=>{
    const product = await Product.findById(req.params.id)
    res.render('products/edit',{product})
})
app.put('/products/:id',async(req,res)=>{
    // res.send('it worked')
    const {id} = req.params
    // console.log(req.body.product)
    const newTitle = req.body.product.title;
    const newCondition = req.body.product.condition
   const product=await Product.findByIdAndUpdate({ _id: id },{
   ...req.body.product//spread operation used 
   },{new:true})
   res.redirect(`/products/${product._id}`)
})
app.delete('/products:id',async(req,res)=>{
    const {id} = req.params
    // res.send('it worked')
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log("Serving on port 3000")
})