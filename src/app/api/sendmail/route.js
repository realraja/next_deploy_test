import connectDB from '@/database';
import User from '@/models/user';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(request) {
    await connectDB();

    let OtpGenrate = (limit) => {
        let digits = '0123456789';
        let OTP = '';

        for (let i = 0; i < limit; i++) {
            OTP += digits[Math.floor(Math.random() * 10)]
        }
        return OTP;
    }

    try {
        const {email} = await request.json();
        const otp = OtpGenrate(6);
        const HashOtp =  await hash(otp,10);
        const user = await User.findOne({email:email});

        if(!user){
            return NextResponse.json({
                status: 400,
                success: false,
                message: 'You are not allowed to access this page',
            });
        }

        user.otp = HashOtp;
        await user.save();
        // console.log(user.otp);




        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure:false,
            auth: {   
                user: 'realllraja@gmail.com',
                pass: 'itlglltszclyhdie'
            },
        })

        const mailOption = {
            from: 'realllraja@gmail.com',
            to: email,
            subject: "Send OTP For Verification of ehisab",
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Eहिसाब</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Thank you for choosing Eहिसाब. Use the following OTP to complete your Sign Up procedures. OTP is valid for life time!</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
              <p style="font-size:0.9em;">Regards,<br />Eहिसाब</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Eहिसाब Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
              </div>
            </div>
          </div>
        `
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({ message: "OTP Sent Successfully" ,success:true,email}, { status: 200 })
    } catch (error) {

        console.log(error)
        return NextResponse.json({ message: "Failed to Send OTP",success:true }, { status: 500 })
    }
}