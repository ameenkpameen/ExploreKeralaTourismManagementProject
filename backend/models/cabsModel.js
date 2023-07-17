const mongoose = require('mongoose');

const cabsSchema = mongoose.Schema(
    {
        propertyholder: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Owner",
            required: true
        },
        registerNumber:{
            type: String,
            required:true
        },
        brandname: {
            type: String,
            required: true
        },
        modelname: {
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
        seatingCapacity: {
            type: Number,
            required: true
        },
        fuelType: {
            type: String,
            required: true
        },
        minCharge: {
            type: Number,
            required: true
        },
        extraFair: {
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
            default:[]
        },
    },
    {
        timestamps: true,
    }
)




const Cab = mongoose.model('Cab', cabsSchema)

module.exports = Cab;