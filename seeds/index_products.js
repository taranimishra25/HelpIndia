const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const products = require('./products')
const Product = require('../models/product')

mongoose.connect('mongodb://127.0.0.1:27017/help-india')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connection open!!!!")
})

console.log(products[0]);
const seedDB = async () => {
    await Product.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const c = new Product(products[i]);
        c.save();
    }
}

seedDB();