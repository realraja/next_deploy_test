import connectDB from "@/database"
import User from "@/models/user";
import { NextResponse } from "next/server";
import Message from "@/models/message";




export const POST = async(req)=>{
    const {email,name,message,subject} = await req.json();
    if(!subject || !name || !message ){
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

        

       
        // console.log(token);

        const newComment = await Message.create({
            name,
            role:isUserExist?.role,
            email,
            user:isUserExist?._id,
            message,
            img:isUserExist?.photoURL,
            subject,
        })


        return NextResponse.json({
            status: 200,
            success: true,
            message: 'Your Message sent successfully',
            finalData: newComment,
        });

    } catch (error) {
        console.log('error in login');
        return NextResponse.json({
            status: 400,
            success: false,
            message: 'error in message|| please try again later',
        })
    }

    
}


export const GET = async()=>{
    await connectDB();

    try {
        const messages = await Message.find().sort({$natural:-1});
        return NextResponse.json({
            status: 200,
            success: true,
            message: 'messages fetched successfully',
            data: messages
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status:400,
            success: false,
            message: 'Error fetching users',
            data: error
        })
    }
}