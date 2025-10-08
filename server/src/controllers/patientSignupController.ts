import {Response, Request, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  User, {IPatient } from '../models/Users'; 
import { SECRET_KEY } from './jsonWebToken-Config';


const patientSignupController = async (req : Request, res: Response, next: NextFunction ) => {
  try{
    const{ firstName, lastName, email, mobNumber, NIC, dob, gender, password, address } = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400).json({message: "User already exists"});
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser:IPatient = new User({firstName, lastName, email, mobNumber: parseInt(mobNumber), NIC, dob: new Date(dob), gender, address,  password: hashedPassword});
    await newUser.save();
    console.log(newUser)


    const token = jwt.sign({email}, SECRET_KEY);

    res.status(201).json({token});
  }
  catch(error){
    next(error);
  }
}

export default patientSignupController
