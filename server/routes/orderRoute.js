import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';

import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyRazorpayPayment,
  placeGuestOrder,
  placeGuestOrderRazorpay,
  verifyGuestRazorpayPayment,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/razorpay/verify', authUser, verifyRazorpayPayment);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);
orderRouter.post('/guest', placeGuestOrder); 
orderRouter.post("/guest/razorpay", placeGuestOrderRazorpay);
orderRouter.post("/guest/razorpay/verify", verifyGuestRazorpayPayment);
export default orderRouter;
