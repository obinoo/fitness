import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) =>{

   try{

    const token = req.header('Authorization')

    if (!token) {
      res.status(401).json({ message: 'No token, authorization denied' });
      return; // Make sure the function exits after sending the response
    }
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded;

    next();

   }catch(error){
    res.status(400).json({ message: 'Token is not valid' });
   }
}

export default auth;