const Order = require('../models/OrderModel');
const User = require('../models/UserModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

// create chekout in stripe
exports.createCheckout = async(req,res) => {
    const line_items = req.body.cart.map(prod =>{
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: prod.name,
                    images: [prod.image.secure_url],
                    description: prod.description,
                },
                unit_amount: prod.price * 100
            },
            quantity: prod.count
        }
    })
    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 0,
                  currency: 'usd',
                },
                display_name: 'Free shipping',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7,
                  },
                },
              },
            },
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'usd',
                },
                display_name: 'Next day air',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 1,
                  },
                },
              },
            },
          ],
        phone_number_collection:{
            enabled:true
        },
        line_items,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/payment-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
      });
        
    
   
      res.json({sessionId: session.id });
}

// create order in dtabase
exports.createOrder = async(req,res)=>{
    try {
        
        const sessionId = req.body.sessionId
        const {cart, userId} = req.body
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid'){
        const products = cart.map(prod=>{
            return {
            productId: prod._id,
            quantity: prod.count
            }
        })
        const findedOrder = await Order.findOne({sessionId})
        if (findedOrder) return 
        const newOrder = new Order({
            sessionId,
            userId,
            products,
            totalPrice: session.amount_total / 100,
            shippingAdress: {
                city: session.customer_details.address.city,
                country: session.customer_details.address.country,
                line1: session.customer_details.address.line1,
                line2: session.customer_details.address.line2,
                postalCode: session.customer_details.address.postal_code,
                phone: session.customer_details.phone,
            }
          })
          await newOrder.save()
          const user = await User.findById(userId)
          if(!user) return res.status(404).json({message: "user noot found"})
          user.orders.push({orderId: newOrder._id})
          await user.save()
          res.json({message: "order added"})
        }else {
            res.send('Payment failed.');
          }
    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }
}

// get all orders (only admin)
exports.getAllOrders = async(req,res)=>{
  try {
    res.pagination.list = await Promise.all(
    res.pagination.list.map(async(item)=>{
      const itemModel = await Order.findById(item._id)
        .populate('userId', "firstName lastName image")
        .populate("products.productId", "name description image")
        .exec()
          return itemModel
    })
    )
    // if(!orders) return res.status(404).json({message: "order not found"})
    res.json({orders:res.pagination})
  } catch (error) {
    res.status(500).json({message: "internal server error", error:error.message})
  }
}

// get one order by id
exports.getOneOrder= async(req,res)=>{
  try {
    const {id} = req.params
    const order = await Order.findById(id)
    .populate('userId', "firstName lastName image")
    .populate("products.productId", "name description price category stock image")
    .exec()
    if(!order) return res.status(404).json({message: "order not found"})
    res.json({order})
  } catch (error) {
    res.status(500).json({message: "internal server error"})
  }
}

// update one order by id
exports.updateOrder = async(req, res) =>{
  try {
    const {id} = req.params
    const {action} = req.body
    const order = await Order.findById(id)
    if(!order) return res.status(404).json({message: "order not found"})
    order.status = action
    await order.save()
    const updatedOrder = await Order.findById(id)
    .populate('userId', "firstName lastName image")
    .populate("products.productId", "name description image")
    .exec()
    res.json({updatedOrder})
  } catch (error) {
    res.status(500).json({message: "internal server error"})
  }
}

// get user order 
exports.getUserOrders = async(req,res)=>{
  try {
    const userId = req.userToken._id
    const orders = await Order.find({userId})
    .populate("products.productId", "name description image price category")
    if(!orders) return res.status(404).json({message: "order not found"})
    res.json({orders})
  } catch (error) {
    res.status(500).json({message: "internal server error", error: error.message})
  }
}

exports.getUserOneOrder = async(req,res)=>{
  try {
    // const userId = req.userToken._id
    const {id} = req.params
    const order = await Order.findById(id)
    .populate("products.productId", "name description price category stock image")
    if(!order) return res.status(404).json({message: "order not found"})
    res.json({order})
  } catch (error) {
    res.status(500).json({message: "internal server error", error: error.message})
  }
}