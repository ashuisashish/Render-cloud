import Product from "../models/productModel.js";


const latestProducts = async (req, res) => {
    try {  
      const products = await Product.find({ is_latest: true });
      return res.status(200).json({
        message: "Latest Products fetched successfully",
        products, 
      });
    } catch (error) {
      console.error("Error fetching latest products:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const toggleLatestProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(200).json({ message: "Product not found" });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: { is_latest: !product.is_latest } },
        { new: true }
      );
  
      return res.status(200).json({
        message: "Product is_latest toggled successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error in toggleLatestProduct:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getAllProducts = async (req, res) => {
    try {
      
      const products = await Product.find();
  
      return res.status(200).json({
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getProductsByCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      if (!categoryId) {
        return res.status(400).json({ message: "Category ID is required" });
      } 
      const products = await Product.find({ category: categoryId });
      if (!products.length) {
        return res.status(404).json({ message: "No products found for this category" });
      }
  
      return res.status(200).json({
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getProductById = async (req, res) => {
    try {
      const productId = req.params.id;  
      if (!productId) {
        return res.status(200).json({ message: "Product ID is required" });
      }
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(200).json({ message: "Product not found" });
      }
  
      return res.status(200).json({
        message: "Product fetched successfully",
        product,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const addProduct = async (req, res) => {
    try {
      const { name, description, price, stock, category, images } = req.body;
      if (!name || !description || !price || !stock || !category) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }
      const newProduct = await Product.create({
        name,
        description,
        price,
        stock,
        category,
        images: images || [], 
      });
  
      return res.status(201).json({
        message: "Product added successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, description, price, stock, category, images } = req.body;
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          name: name || existingProduct.name,
          description: description || existingProduct.description,
          price: price || existingProduct.price,
          stock: stock || existingProduct.stock,
          category: category || existingProduct.category,
          images: images || existingProduct.images,
        },
        { new: true}
      );
  
      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  const deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
  
      
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };  

export {latestProducts,toggleLatestProduct,getAllProducts,getProductsByCategory,getProductById,addProduct,updateProduct,deleteProduct}
