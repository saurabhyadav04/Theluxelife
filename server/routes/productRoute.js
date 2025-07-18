import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList, deleteProduct, } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.fields([{ name: 'images', maxCount: 3 },{ name: 'video', maxCount: 1 }]), addProduct );
productRouter.get('/list', productList)
productRouter.get('/id', productById)
productRouter.post('/stock', authSeller, changeStock)
productRouter.delete('/:id', authSeller, deleteProduct);
export default productRouter;