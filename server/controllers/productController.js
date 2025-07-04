import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"





export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product discontinued successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    // ✅ Get images & video separately from req.files object
    const images = req.files?.images || [];
    const video = req.files?.video?.[0] || null;

    // ✅ Upload images to Cloudinary
    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // ✅ Upload video to Cloudinary (optional)
    let videoUrl = "";
    if (video) {
      const videoUpload = await cloudinary.uploader.upload(video.path, {
        resource_type: "video",
      });
      videoUrl = videoUpload.secure_url;
    }

    // ✅ Save to DB
    await Product.create({
      ...productData,
      image: imageUrls,
      video: videoUrl,
    });

    res.json({ success: true, message: "Product Added" });

  } catch (error) {
    console.log("Add Product Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get Product : /api/product/list
export const productList = async (req, res)=>{
    try {
        const products = await Product.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get single Product : /api/product/id
export const productById = async (req, res)=>{
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.json({success: true, product})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res)=>{
    try {
        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, {inStock})
        res.json({success: true, message: "Stock Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
