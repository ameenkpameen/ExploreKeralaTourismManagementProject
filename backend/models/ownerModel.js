const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const ownerSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        phonenumber: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        image:{
            type:String,
            required: true,
            default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        public_id:{
            type:String,
            required: true,
            default:"sample"
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



ownerSchema.pre('save', async function(next){
   if(!this.isModified('password')){
      next();
   }

   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})


ownerSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


const Owner = mongoose.model('Owner', ownerSchema)

module.exports = Owner;