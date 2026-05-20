import { User } from "../DB/models/User";
import { verifyToken } from "../utils/jwt";

export const authenticate = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new Error("Authentication invalid");
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    }catch(error){
        next(error);
    }
}

export const  authorization = (roles) => (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        throw new Error("Unauthorized");
    }
    next();
}