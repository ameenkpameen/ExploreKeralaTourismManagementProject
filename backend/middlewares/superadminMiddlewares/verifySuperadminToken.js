const jwt = require('jsonwebtoken')
const jwtSecret = process.env.SUPERADMIN_JWT_SECRET


const verifySuperadminToken = (req,res,next)=>{
    const token = req.headers.token;
    if(!token) {
        console.log("not found token");
        return res.status(401).json({message: "Super Admin Token Not Found"})
    }

    try {
        const decodedToken = jwt.verify(token.split(' ')[1],jwtSecret)
        req.superadminId = decodedToken.superadminId

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message })
    }
}

module.exports = {
    verifySuperadminToken
}