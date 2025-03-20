import mongoose,{Schema} from "mongoose";

const productSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      images: [
        {
          type: String,
        },
      ],
      description: {
        type: String,
        required: true,
        trim: true, 
      },
      price: {
        type: Number,
        required: true,
        min: 0, 
      },
      stock: {
        type: Number,
        required: true,
        min: 0, 
      },
      is_latest: {
        type: Boolean,
        default: false, 
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    },
    {
      timestamps: true, 
    }
  );

const Product=mongoose.model("Product",productSchema);
export default Product;