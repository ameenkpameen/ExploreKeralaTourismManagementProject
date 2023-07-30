const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        propertyholder: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Owner",
            required: true
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            refPath: 'type'
        },
        costomer: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        propertyname: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['Cab', 'Hotel', 'HomeStay'],
            required: true
        },
        fromDate: {
            type: Date,
            required:true
        },
        toDate: {
            type: Date,
            required:true
        },
        numberofdays: {
            type: Number,
            required:true
        },
        amountpaid:{
            type: Number,
            required:true
        },
        amounttobepaid:{
            type: Number,
            required:true
        },
        discount:{
            type: Number,
            required:true,
            default:0
        },
        paymentmethod:{
            type: String,
            enum:['stripe','wallet','Not Done'],
            default:'Not Done',
        },
        status:{
            type: String,
            required:true,
            default: 'Pending',
        }
    },
    {
        timestamps: true,
    }
)




const Order = mongoose.model('Order', orderSchema)

module.exports = Order;