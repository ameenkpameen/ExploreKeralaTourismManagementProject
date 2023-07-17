const jwt = require('jsonwebtoken')

const userGenerateToken = (id)=>{
    console.log("useradminstoken");
    return jwt.sign({id},process.env.USER_JWT_SECRET,{
        expiresIn: "300",
    })
}


const adminGenerateToken = (id)=>{
    console.log("adminstoken");
    return jwt.sign({id},process.env.ADMIN_JWT_SECRET,{
        expiresIn: "300",
    })
}

const superAdminGenerateToken = (id)=>{
    console.log("superadminstoken");
    return jwt.sign({id},process.env.SUPERADMIN_JWT_SECRET,{
        expiresIn: "300",
    })
}

module.exports = userGenerateToken,adminGenerateToken,superAdminGenerateToken