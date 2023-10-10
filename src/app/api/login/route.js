import connectDB from "@/database"
import User from "@/models/user";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import jwt  from "jsonwebtoken";




export const POST = async(req)=>{
    const {email,password} = await req.json();
    if(!email || !password){
        return NextResponse.json({
            status: 400,
            success: false,
            message: 'please fill all fields',
        })
     }
    
    await connectDB();
    // console.log(name,email,password,role);

    try {
        const isUserExist = await User.findOne({email});

        if(!isUserExist){
            return NextResponse.json({
                status: 400,
                success: false,
                message: 'You are not registered yet. Please register now',
            });
        }

        const checkPassword = await compare(password,isUserExist.password);
        if(!checkPassword){
            return NextResponse.json({
                status: 400,
                success: false,
                message: 'Please check your password and try again',
            });
        }

        const token = await jwt.sign({
            email: isUserExist?.email,
              name: isUserExist?.name,
              _id: isUserExist?._id,
              role: isUserExist?.role,
              img: isUserExist?.photoURL,
              village: isUserExist?.village,
              activated: isUserExist?.activated,
              hidden: isUserExist?.hidden,
              date: isUserExist?.createdAt
        },'rajesh8875');
        // console.log(token);

        const finalData = {
            token,
            user: {
              email: isUserExist?.email,
              name: isUserExist?.name,
              _id: isUserExist?._id,
              role: isUserExist?.role,
              img: isUserExist?.photoURL,
              activated: isUserExist?.activated,
              village: isUserExist?.village
            },
          };


        return NextResponse.json({
            status: 200,
            success: true,
            message: 'user has been logged in successfully',
            finalData: finalData,
        });

    } catch (error) {
        console.log('error in login');
        return NextResponse.json({
            status: 400,
            success: false,
            message: 'error in login|| please try again later',
        })
    }

    
}