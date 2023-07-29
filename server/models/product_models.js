import mongoose, { Schema } from 'mongoose'
import slugify from 'slugify'
const productSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Name is required"]
    },
    slug:{
        type:String,
        unique:true
    },
    description:{
        type:String,
        trim:true,
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    category:{
        type:String
    },
    quantity:{
        type:Number,
        required:[true,"Quantity is required"]
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    },
    updated:Date,
    created:{
        type:Date,
        default:Date.now
    }
})
productSchema.pre("save",function(next){
    this.slug = slugify(this.name,{lower:true,strict:true,replacement:'-'})
    next();
})
export default mongoose.model("Product",productSchema)
