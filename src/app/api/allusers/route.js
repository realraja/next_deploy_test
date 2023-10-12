import connectDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";



export const GET = async() =>{
    await connectDB();

    try {
        const user = await User.find();
        return NextResponse.json({
            status: 200,
            success: true,
            message: 'Users fetched successfully',
            data: user
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