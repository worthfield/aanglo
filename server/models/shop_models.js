import mongoose, { Schema } from 'mongoose'
import slugify from 'slugify'
import Product from "./product_models.js";


const shopSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Name is required"]
    },
    description:{
        type:String,
        trim:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    updated:Date,
    created:{
        type:Date,
        default:Date.now
    }
})

  
export default mongoose.model('Shop',shopSchema)