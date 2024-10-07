import  {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/user'
import {signUpValidate, loginValidate }from '../validators/userValidator'

 export const signUp = async (req: Request, res: Response): Promise<any> =>{

    try{
        const {error} = signUpValidate.validate(req.body)

        if(error) return res.status(400).json({ error: error.details[0].message});
 
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({
            where: { email}
        })

        if(existingUser){
            return res.status(401).json({message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        })
      res.status(201).json({message: 'User created succesfully', user: createUser})
    }catch(e){
        console.error(e);
        res.status(500).json({ err: `Error occured, not able to create user`})
    }

    
}

export const login = async (req: Request, res: Response): Promise<any> => {
    const { error } = loginValidate.validate(req.body);
    if (error) return res.status(401).json({ error: error.details[0].message });

    try {
        const { email, password } = req.body;

        // Await the result of findOne (since it's an async operation)
        const user: any = await User.findOne({ where: { email } });

        // Check if the user exists
        if (!user) {
            return res.status(400).json({ message: 'Error, User not found' });
        }

        // Compare the password directly (no need for getDataValue)
        const isPassword = await bcrypt.compare(password, user.password);

        // If the password is incorrect
        if (!isPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
