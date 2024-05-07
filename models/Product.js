const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        
        type: String,
        required:[true,'please provide the name']
    }
    ,
    id:{
        type:Number,
        required: [true,'please provide the id']
        
    }
     ,
    price: Number,
    thumbnail: {
        type:String,
        required:[true, 'please provide thumbnail'],
    },
    count: {
        type:Number,
        default:1,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
      
},
{timestamps: true}
)


module.exports = mongoose.model('Product',ProductSchema)