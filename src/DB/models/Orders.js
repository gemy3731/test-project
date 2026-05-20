import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    price:{
        type:Number,
        required:true,
        min:0
    }
});

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    total_amount:{
        type:Number,
        required:true,
        min:0
    },
    status:{
        type:String,
        required:true,
        enum:["pending","completed","cancelled"],
        default:"pending"
    },
    products:{
        type:[orderItemsSchema],
        required:true,
        validate:{
            validator:(v)=> v.length > 0,
            message:"Order must have at least one product"
        }
    }

},{
    timestamps:true
});


export const Order = mongoose.model("Order",orderSchema);