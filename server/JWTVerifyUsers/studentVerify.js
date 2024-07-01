import jwt from "jsonwebtoken";
export const studentVerify = (req,res,next) =>{
    const {token} = req.cookies
    try {
        const user = jwt.verify(token,process.env.JWT_SECRET_KEY)
         req.user = user
         if(user){
            next()
         }
        
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
}