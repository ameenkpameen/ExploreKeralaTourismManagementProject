const mongoose = require('mongoose');

const coupenSchema = mongoose.Schema(
    {
        propertytype: {
            type: String,
            enum:['Cab','HomeStay','Hotel'],
            required: true,
        },
        expirydate: {
            type: Date,
            required:true,
        },
        percentage: {
            type: Number,
            required:true,
        },
        maxoffer: {
            type: Number,
            required:true,
        },
        usersused: {
            type: Array,
            required: true,
            default:[],
        },
        coupencode: {
            type: String,
            required: true,
        },
        status:{
            type: String,
            required:true,
            default: 'active',
        }
    },
    {
        timestamps: true,
    }
)




const Coupen = mongoose.model('Coupen', coupenSchema)

module.exports = Coupen;