const jwt = require('jsonwebtoken')

const adminGenerateToken = (id)=>{
    return jwt.sign({id},process.env.ADMIN_JWT_SECRET,{
        expiresIn: "60000000",
    })
}

const userGenerateToken = (id)=>{
    return jwt.sign({id},process.env.USER_JWT_SECRET,{
        expiresIn: "60000000",
    })
}



const superAdminGenerateToken = (id)=>{
    return jwt.sign({id},process.env.SUPERADMIN_JWT_SECRET,{
        expiresIn: "60000000",
    })
}

module.exports = {userGenerateToken,adminGenerateToken,superAdminGenerateToken}