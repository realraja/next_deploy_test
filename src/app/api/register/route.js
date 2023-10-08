import connectDB from "@/database"
import User from "@/models/user";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import validator from "validator";




export const POST = async(req)=>{
    const {name,email,password,village,photoURL,role} = await req.json();
    // console.log(validator.isEmail(email))
    
    if(!village){
        return NextResponse.json({
            status: 400,
            success: false,
            message: 'please select your village',
        })
     }
     if(!photoURL){
        return NextResponse.json({
            status: 400,
            success: false,
            message: 'please select your photo',
        })
     }
    if(!name || !email || !password || !validator.isEmail(email)){
        return NextResponse.json({
            status: 400,
            success: false,
            message: 'please fill all fields or check your email',
        })
     }
    
    await connectDB();
    // console.log(name,email,password,role);

    try {
        const isUserExist = await User.findOne({email});

        if(isUserExist){
            return NextResponse.json({
                status: 400,
                success: false,
                message: 'user already exist',
            });
        }

        const key = await jwt.sign(password,'rajesh8875');

        const hashPassword = await hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password:hashPassword,
            key,
            village,
            photoURL,
            role
        })

        return NextResponse.json({
            status: 200,
            success: true,
            message: 'user has been registered',
            user: newUser
        });

    } catch (error) {
        console.log('error in registration==>',error);
        return NextResponse.json({
            status: 400,
            success: false,
            message: 'error in registration|| please try again later',
        })
    }

    
}