import mongoose, { Schema } from 'mongoose'
import slugify from 'slugify'

const shopSchema = new Schema({
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
shopSchema.pre('save',function(next){
    this.slug=slugify(this.name,{lower:true,strict:true,replacement:'-'})
    next()
})
export default mongoose.model('Shop',shopSchema)