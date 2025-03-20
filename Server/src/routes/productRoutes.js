import express from "express";
import {
    latestProducts,
    toggleLatestProduct,
    getAllProducts,
    getProductsByCategory,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

import { authenticate,checkAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/latest",authenticate,latestProducts);  //fetch latest collection products
router.put("/:id/latest",authenticate,checkAdmin,toggleLatestProduct);//toggle latest collection status (admin)
router.get("/",authenticate,getAllProducts);  //fetch all products
router.get("/category/:id",authenticate,getProductsByCategory);  // fetch product by catogory
router.get("/:id",authenticate,getProductById,);  // fetch single product
// admin routes
router.post("/",authenticate,checkAdmin,addProduct);  // add new product via admin
router.put("/:id",authenticate,checkAdmin,updateProduct); // update product via admin  
router.delete("/:id",authenticate,checkAdmin,deleteProduct); // delete product via admin 

export default router;
