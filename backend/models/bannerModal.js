const mongoose = require('mongoose');
const Owner = require('./ownerModel');

const bannerSchema = mongoose.Schema(
    {
        heading: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'type'
        },
        type: {
            type: String,
            enum: ['Cab', 'Hotel', 'HomeStay'],
            required:true
        },
        status: {
            type: String,
            required: true,
            default: "list"
        },
        createdby: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:Owner,
        },
    },
    {
        timestamps: true,
    }
)




const Banner = mongoose.model('Banner', bannerSchema)

module.exports = Banner;