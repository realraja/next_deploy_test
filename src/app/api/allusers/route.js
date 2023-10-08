import connectDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";



export const GET = async() =>{
    await connectDB();

    try {
        const user = await User.find();
        return NextResponse.json({
            status: 300,
            success: true,
            data: user
        })
    } catch (error) {
        return NextResponse.json({
            status:400,
            success: false,
            data: error
        })
    }
}