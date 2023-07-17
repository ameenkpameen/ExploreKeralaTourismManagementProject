const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const superadminSchema = mongoose.Schema(
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
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        isSuperAdmin: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    {
        timestamps: true,
    }
)



superadminSchema.pre('save', async function(next){
   if(!this.isModified('password')){
      next();
   }

   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})


superadminSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


const SuperAdmin = mongoose.model('Superadmin', superadminSchema)

module.exports = SuperAdmin;