import connectDB from "@/database"
import Message from "@/models/message";
import { NextResponse } from "next/server";





export const PUT = async(request,{params}) =>{
    await connectDB();

    try {
        const messageId = params.id;
        const message = await Message.findById(messageId);
        if(!message){
            return NextResponse.json({
                status: 404,
                success : false,
                message:'message not found'
            })
        }

        message.ischeck = !message.ischeck;
        await message.save();
        return NextResponse.json({stauts:200,success:true,message:params.id,message:'task updated successfully',message:message});
    } catch (error) {
        console.log("error===>",error);
        return NextResponse.json({
            status: 404,
            success : false,
            message:error
        })
    }
}