import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import sendMail from '../middlewares/otp.js'
import users from '../models/auth.js'

export const signup =async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        const existinguser=await users.findOne({email})
        if(existinguser){
            return res.status(400).json({message:'User already found..'})
        }
        const hashPassword = await bcrypt.hash(password,12);
        const newUser=await users.create({name,email,password:hashPassword})
        const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({result:newUser,token})
        }catch(err){
        res.status(500).json("Something went wrong...")
    }
}


export const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const existinguser = await users.findOne({email})
        if(!existinguser){
            return res.status(404).json({message:"User not found..."})
        }
        const isPasswordCrt = await bcrypt.compare(password,existinguser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({email:existinguser.email,id:existinguser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({result:existinguser,token})
    }catch(err){
        res.status(500).json(err.message)
    }
}

export const sendOtp=async(req,res) =>{
    const {email,gotp:otp} = req.body
    try {
        let msg=`Your otp is ${otp} ,-Stackoverflow`
        sendMail(email,msg)
        res.status(200).json('success')
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}