const jwt = require('jsonwebtoken')
const jwtSecret = process.env.ADMIN_JWT_SECRET


const verifyOwnerToken = (req,res,next)=>{
    const token = req.headers.token;
    if(!token) {
        console.log("not found token");
        return res.status(401).json({message: "Owner Token Not Found"})
    }

    try {
        const decodedToken = jwt.verify(token.split(' ')[1],jwtSecret)
        req.ownerId = decodedToken.userId

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message })
    }
}

module.exports = {
    verifyOwnerToken
}