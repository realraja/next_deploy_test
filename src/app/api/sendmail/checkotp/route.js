import connectDB from '@/database';
import User from '@/models/user';
import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await connectDB();

    try {
        const {otp,email} = await request.json();
        const user = await User.findOne({email:email});

        if(!user){
            return NextResponse.json({
                status: 400,
                success: false,
                message: 'You are not allowed to access this page',
            });
        }

        const checkOtp = await compare(otp,user.otp);
        if(!checkOtp){
            return NextResponse.json({
                status: 400,
                success: false,
                message: 'Please check your OTP and try again',
            });
        }
      

        return NextResponse.json({ message: "OTP verified Successfully" ,success:true}, { status: 200 })
    } catch (error) {

        console.log(error)
        return NextResponse.json({ message: "Failed to Verification",success:true }, { status: 500 })
    }
}