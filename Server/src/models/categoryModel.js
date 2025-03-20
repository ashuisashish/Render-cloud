import mongoose,{Schema} from "mongoose";

const categorySchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    }},
    {
        timestamps:true,
    }
);

const Category=mongoose.model("Category",categorySchema);
export default Category;