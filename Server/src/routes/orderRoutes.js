import express from 'express';
import {
    getAllOrders,
    getOrderById,
    placeOrder,
    updateOrderStatus
} from '../controllers/orderController.js';
import { authenticate,checkAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get("/",authenticate,checkAdmin,getAllOrders); // fetch all orders via admin  
router.get("/:id",authenticate,getOrderById); // fetch specific order  
router.post("/",authenticate,placeOrder); // place new order  
router.put("/:id",authenticate,checkAdmin,updateOrderStatus); // update order status via admin


export default router;
