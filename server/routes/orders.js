const express = require('express')
const isAuth = require('../middlewares/auth')
const { createCheckout, createOrder } = require('../controllers/orderController')
const router = express.Router()

router.post('/create-checkout', isAuth ,createCheckout)
router.post('/create-order' ,createOrder)

module.exports = router