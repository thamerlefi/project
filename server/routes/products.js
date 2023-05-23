const { newProduct, getProducts, getOneProduct, updateProduct, deleteProduct } = require('../controllers/productsController')
const isAdmin = require('../middlewares/IsAdmin')
const isAuth = require('../middlewares/auth')

const router = require('express').Router()


// get products
router.get('/', getProducts)
router.get('/:id', getOneProduct)

// create new product (only admin)
router.post('/new',isAuth, isAdmin, newProduct)

// update product (only admin)
router.put('/:id',isAuth, isAdmin, updateProduct)

// delete product (only admin)
router.delete('/:id',isAuth, isAdmin, deleteProduct)

module.exports = router