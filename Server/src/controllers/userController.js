import User from "./../models/userModel.js";
import jwt from "jsonwebtoken"
const register = async (req, res) => {
  try {
    const { name, email, password, phone_number, address, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "User already register" });
    }
    const newUser = await User.create({
      name,
      email,
      password,
      phone_number,
      addresses: [
        {
          address_line: address.address_line,
          city: address.city,
          state: address.state,
          postal_code: address.postal_code,
          country: address.country,
        },
      ],
      role: role || "user"
    });
    return res.status(200).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    console.log(error);
  }
};

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(200).json({message:"User not found"});
        }
        const isPasswordValid = await user.isPasswordCorrect(password);
        
        if (!isPasswordValid) {
            return res.status(200).json({ message: "Invalid Credentials" });
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'});
        
        return res.status(200).json({message:"User Logged in Successfully",token});
        

    }
    catch (error){
        console.error("Error in login:", error);
    }

}

const logout=async(req,res)=>{
    res.status(200).json({message:"User Logout Successfully"})
}

const forgotPassword=async(req,res)=>{
    try {
        const userId=req.userId;
        const user=await User.findById(userId);
        const email=user.email   //logic will be implemented ,how to send email to user
        res.status(200).json({
            message:"Email send Successfully",
            email
        })
    } catch (error) {
        console.log(error); 
    }
}

const userProfile=async(req,res)=>{
    try{
        const userId=req.userId;
        const user=await User.findById(userId);
        delete user.password;
        return res.status(200).json({
            message:"User detail",
            user
        })
    }
    catch(error){
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try {
      const userId = req.userId; 

      const existingUser = await User.findById(userId);
 
      let { name, phone_number } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name: name || existingUser.name,
          phone_number: phone_number || existingUser.phone_number,
        },
        { new: true}
      );
  
      return res.status(200).json({
        message: "User profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const addAddress = async (req, res) => {
    try {
      const userId = req.userId; 
      const { address_line, city, state, postal_code, country } = req.body;
  
      
  
      
      if (!address_line || !city || !state || !postal_code || !country) {
        return res.status(200).json({ message: "All address fields are required" });
      }
  
      
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            addresses: {
              address_line,
              city,
              state,
              postal_code,
              country,
            },
          },
        },
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        message: "Address added successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error adding address:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };



export {register,login,logout,forgotPassword,userProfile,updateUser,addAddress}