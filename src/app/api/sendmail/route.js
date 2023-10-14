import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const {email} = await request.json();

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
        <h3>Hello User</h3>
        <h1> OPT =>[ ${"804382"}]</h1> 
        `
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({ message: "OTP Sent Successfully" ,success:true,email}, { status: 200 })
    } catch (error) {

        console.log(error)
        return NextResponse.json({ message: "Failed to Send OTP",success:true }, { status: 500 })
    }
}