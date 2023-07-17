const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema(
    {
        propertyholder: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Owner",
            required: true
        },
        propertyname: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        numberOfRooms: {
            type: Number,
            required: true
        },
        baseprice: {
            type: Number,
            required: true
        },
        netprice: {
            type: Number,
            required: true
        },
        images:{
            type:Array,
            required:true
        },
        document:{
            type:Object,
            required:true
        },
        status: {
            type: Boolean,
            required: true,
            default: false
        },
        ordered: {
            type: Array,
            default: []
        },
    },
    {
        timestamps: true,
    }
)




const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel;