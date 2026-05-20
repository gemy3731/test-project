const productsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true,
        minLegnth:3,
        maxLegnth:20
    },
    category:{
        type:String,
        required:[true,"Category is required"],
        trim:true,
        minLegnth:3,
        maxLegnth:20,
        lowercase:true
    },
    price:{
        type:Number,
        required:[true,"Price is required"],
        min:0
    },
    stock:{
        type:Number,
        required:[true,"Stock is required"],
        min:0
    }
});

export const Product = mongoose.model("Product",productsSchema);