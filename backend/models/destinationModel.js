const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema(
    {
        destination: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        spots: {
            type: Array,
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
        status: {
            type: String,
            required: true,
            default: "active"
        },
    },
    {
        timestamps: true,
    }
)




const Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination;