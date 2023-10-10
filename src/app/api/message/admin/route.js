import connectDB from "@/database"
import Message from "@/models/message";
import { NextResponse } from "next/server";


export const GET = async()=>{
    await connectDB();

    try {
        const messages = await Message.find();
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