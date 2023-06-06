const Order = require('../models/OrderModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

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

exports.createOrder = async(req,res)=>{
    try {
        
        const sessionId = req.body.sessionId
        const {cart,total, userId} = req.body
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
          res.json({message: "order added"})
        }else {
            res.send('Payment failed.');
          }
    } catch (error) {
        
    }
}