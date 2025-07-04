import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: [String], required: true }, // Explicit string array
    video: { type: String }, // ✅ New field
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model('product', productSchema);

export default Product;
