const cloudinary = require('../utils/cloudinaryConfig.js')
const Product = require('../models/ProductModel')
const { newError } = require('../utils/Errors.js');



// get all products => /api/products
exports.getProducts = async(req,res)=>{
    try {
        res.pagination.activePage = +req.query.page
        res.status(200).json(res.pagination)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// get one product details => /api/products/:id
exports.getOneProduct = async (req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product) return next(newError(404,"product not found"))
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({message: 'product not found'})
    }
}

// create new product => /api/products/new
exports.newProduct = async(req,res,next)=>{
    try {
        const {name,price,category,description,stock} = req.body
        if(!name || !price || !category || !description || !stock) 
            return next(newError(400, 'please fill all required fuilds'))  
        if (!req.body.image) return next(newError(400, 'please choose an image'))
        const uploadRes = await cloudinary.uploader.upload(req.body.image, {upload_preset: 'e-commerce'})
        const {public_id, secure_url} = uploadRes
        req.body.image = {public_id, secure_url}
        const product = await Product.create(req.body)
        res.status(201).json({
            message: 'product created successfuly',
            product,
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
        if (req.body.image !== "") {
            cloudinary.uploader.destroy(product.image.public_id)
            const uploadRes = await cloudinary.uploader.upload(req.body.image, {upload_preset: 'e-commerce'})
            const {public_id, secure_url} = uploadRes
            req.body.image = {public_id, secure_url}
        } else req.body.image = product.image
        product = await Product.findByIdAndUpdate(req.params.id, req.body,{ new: true })
        res.json({message: 'product updated',product})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// delete product => /api/products/:id
exports.deleteProduct= async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({message: 'product not found'})
        cloudinary.uploader.destroy(product.image.public_id)
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'product deleted', product: deletedProduct})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
