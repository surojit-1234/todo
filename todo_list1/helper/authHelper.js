import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async(password) => {
    try{
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        return hashPassword;
    }catch(error){
        console.log(error)
    }
}

export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

export const generateToken = (id) => {
    const token = jwt.sign({id},process.env.JWT_SECRET, {expiresIn: '1d',});
    return token
}

export const tokenVerify = (token) => {
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        return decode;
    }catch(error){
        throw new Error('Invalid or expired token');
    }
};
    
    


 