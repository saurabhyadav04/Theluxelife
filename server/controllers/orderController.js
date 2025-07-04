import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe"
import User from "../models/User.js"
import crypto from "crypto";
import Razorpay from "razorpay";
import { sendOrderEmail } from "../utils/sendEmail.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});


// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res)=>{
    try {
        const { userId, items, address } = req.body;
        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }
        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({success: true, message: "Order Placed Successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Place Guest Order : /api/order/guest
export const placeGuestOrder = async (req, res) => {
  try {
    const { items, address } = req.body;

    if (!address || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // Calculate amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }

    // Add tax (optional)
    amount += Math.floor(amount * 0.02);

    await Order.create({
      items,
      address, // Embedded guest address
      amount,
      paymentType: "Online",
      isGuest: true, // Optional: add this flag if you want to filter later
    });

    return res.json({ success: true, message: "Guest order placed successfully" });
  } catch (error) {
    console.error("Guest Order Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Place Order Razorpay : /api/order/razorpay
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Fixed amount calculation
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    // Safety check
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ success: false, message: "Invalid amount calculated" });
    }

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${order._id}`,
    });

    return res.json({
        success: true,
        order: razorpayOrder,
        key: process.env.RAZORPAY_KEY_ID,
        orderId: order._id, // send MongoDB order id for reference
      });

  } catch (error) {
    console.error("Razorpay order error:", error); // 👈 log error
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Razorpay Payment : /api/order/razorpay/verify
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      orderId, // <-- MongoDB order ID from frontend
    } = req.body;

    // Step 1: Generate expected signature
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    // Step 2: Compare signatures
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // Step 3: Mark order as paid
    await Order.findByIdAndUpdate(orderId, { isPaid: true });

    // Step 4: Clear user's cart
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return res.json({ success: true });

  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const placeGuestOrderRazorpay = async (req, res) => {
  try {
    const { items, address } = req.body;
    if (!address || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }

    const order = await Order.create({
      items,
      amount,
      address,
      paymentType: "Online",
      isGuest: true,
    });

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `guest_receipt_${order._id}`,
    });

    return res.json({
      success: true,
      order: razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order._id,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const verifyGuestRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    await Order.findByIdAndUpdate(orderId, { isPaid: true });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};







// Place Order Stripe : /api/order/stripe
export const placeOrderStripe = async (req, res)=>{
    try {
        const { userId, items, address } = req.body;
        const {origin} = req.headers;

        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }

        let productData = [];

        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

       const order =  await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

    // Stripe Gateway Initialize    
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // create line items for stripe

     const line_items = productData.map((item)=>{
        return {
            price_data: {
                currency: "INR",
                product_data:{
                    name: item.name,
                },
                unit_amount: Math.floor(item.price + item.price * 0.02)  * 100
            },
            quantity: item.quantity,
        }
     })

     // create session
     const session = await stripeInstance.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${origin}/loader?next=my-orders`,
        cancel_url: `${origin}/cart`,
        metadata: {
            orderId: order._id.toString(),
            userId,
        }
     })

        return res.json({success: true, url: session.url });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Stripe Webhooks to Verify Payments Action : /stripe
export const stripeWebhooks = async (request, response)=>{
    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        response.status(400).send(`Webhook Error: ${error.message}`)
    }

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId, userId } = session.data[0].metadata;
            // Mark Payment as Paid
            await Order.findByIdAndUpdate(orderId, {isPaid: true})
            // Clear user cart
            await User.findByIdAndUpdate(userId, {cartItems: {}});
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId } = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }
            
    
        default:
            console.error(`Unhandled event type ${event.type}`)
            break;
    }
    response.json({received: true});
}






// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res)=>{
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


// Get All Orders ( for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res)=>{
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}