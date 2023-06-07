const express = require('express')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/IsAdmin')
const { createCheckout, createOrder, getAllOrders, updateOrder, getOneOrder } = require('../controllers/orderController')
const router = express.Router()

// create new checkout in strippe => /api/orders/create-checkout
router.post('/create-checkout', isAuth ,createCheckout)

// create new order in db => /api/orders/create-order
router.post('/create-order' ,createOrder)

// get all orders (only admin) => /api/orders/all
router.get('/all',isAuth, isAdmin, getAllOrders)

// get one order by id (only admin) => /api/orders/:id
router.get('/:id',isAuth, isAdmin, getOneOrder)

// update order (only admin) => /api/orders/update/:id
router.put('/update/:id',isAuth, isAdmin ,updateOrder)

module.exports = router