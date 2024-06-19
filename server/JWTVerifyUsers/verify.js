import jwt from 'jsonwebtoken'

export const cookieAuth = (req,res,next) =>{
    const {token} = req.cookies
    try{
        const user = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = user
        
        next()
    }catch(e){
        res.status(403).json({ message: 'Invalid token' });
    }
}