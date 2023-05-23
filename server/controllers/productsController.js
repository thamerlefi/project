
const Product = require('../models/ProductModel')



// get all products => /api/products
exports.getProducts = async(req,res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// get one product details => /api/products/:id
exports.getOneProduct = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({message: 'product not found'})
    }
}

// create new product => /api/products/new
exports.newProduct = async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(201).json({
            message: 'product created successfuly',
            product
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// update product => /api/products/:id
exports.updateProduct = async(req,res)=>{
    try {
        let product = await Product.findById(req.params.id)
        if(!product) return res.status(404).json({message: 'product not found'})
        product = await Product.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message: 'product updated'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// delete product => /api/products/:id
exports.deleteProduct= async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({message: 'product not found'})
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'product deleted'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
