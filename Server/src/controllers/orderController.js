import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

const getAllOrders = async (req, res) => {
    try {
      
      const orders = await Order.find()
        .populate("user", "name email phone_number") 
        .populate("items.product", "name price stock category") 
        .sort({ createdAt: -1 }); 
  
      return res.status(200).json({
        message: "All orders fetched successfully",
        totalOrders: orders.length,
        orders,
      });
    } catch (error) {
      console.error("Error fetching all orders:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getOrderById = async (req, res) => {
    try {
      const orderId = req.params.id; 
        
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
      }
  
      
      const order = await Order.findById(orderId)
        .populate("user", "name email phone_number") 
        .populate("items.product", "name price stock category"); 
  
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      return res.status(200).json({
        message: "Order fetched successfully",
        order,
      });
    } catch (error) {
      console.error("Error fetching order:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const placeOrder = async (req, res) => {
    try {
      const userId = req.userId; 
      const { items } = req.body; 
  
      
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "Order items are required" });
      }
  
      let total_price = 0;
      const orderItems = [];
  
      
      for (let item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ message:" Product not found: ${item.product}" });
        }
  
        
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: "Insufficient stock for ${product.name}" });
        }
  
        
        const itemTotalPrice = product.price * item.quantity;
        total_price += itemTotalPrice;
  
        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        });
  
        
        product.stock -= item.quantity;
        await product.save();
      }
  
      
      const newOrder = await Order.create({
        user: userId,
        items: orderItems,
        total_price,
        status: "Pending",
      });
  
      return res.status(201).json({
        message: "Order placed successfully",
        order: newOrder,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const updateOrderStatus = async (req, res) => {
    try {
      const orderId = req.params.id; 
      const { status } = req.body; 
  
      
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
      }
  
      
      const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid order status" });
      }
  
      
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true, runValidators: true } 
      );
  
      
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      return res.status(200).json({
        message: "Order status updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export {getAllOrders,getOrderById,placeOrder,updateOrderStatus}
