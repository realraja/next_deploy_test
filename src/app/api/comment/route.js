import connectDB from "@/database"
import Comment from "@/models/comment";
import User from "@/models/user";
import { NextResponse } from "next/server";




export const POST = async(req)=>{
    const {email,comment} = await req.json();
    if(!comment){
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

        const newComment = await Comment.create({
            
            email,
            name:isUserExist?.name,
            img:isUserExist?.photoURL,
            user:isUserExist?._id,
            comment,
            createDate:[new Date().getDate(),new Date().getMonth() +1,new Date().getFullYear(),new Date().getHours(),new Date().getMinutes(),new Date().getSeconds()],
        })


        return NextResponse.json({
            status: 200,
            success: true,
            message: 'Your Message sent successfully',
            finalData: newComment,
        });

    } catch (error) {
        console.log('error in comment',error);
        return NextResponse.json({
            status: 400,
            success: false,
            message: 'error in message|| please try again later',
        })
    }

    
}


export const GET = async() =>{
    await connectDB();

    try {
        const comment = await Comment.find().sort({$natural:-1});
        return NextResponse.json({
            status: 200,
            success: true,
            message: 'Comment fetched successfully',
            data: comment
        })
    } catch (error) {
        console.log('all users error ==>',error);
        return NextResponse.json({
            status:400,
            success: false,
            message: 'Error fetching users',
            data: error
        })
    }
}