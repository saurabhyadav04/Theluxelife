import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';

import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyRazorpayPayment
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/razorpay/verify', authUser, verifyRazorpayPayment);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);

export default orderRouter;
