import connectDB from "@/database"
import User from "@/models/user";
import { NextResponse } from "next/server";




export const GET = async(request,{params}) =>{
    await connectDB();

    try {
        const userId = params.id;
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({
                status: 404,
                success : false,
                message:'User not found'
            })
        }

        return NextResponse.json({stauts:200,success:true,user:params.id,message:'User fetch successfully',user:user});
    } catch (error) {
        console.log("error===>",error);
        return NextResponse.json({
            status: 404,
            success : false,
            message:error
        })
    }
}
export const DELETE = async(request,{params}) =>{
    await connectDB();

    try {
        const userId = params.id;
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({
                status: 404,
                success : false,
                message:'User not found'
            })
        }

        user.hidden = !user.hidden;
        await user.save();
        return NextResponse.json({stauts:200,success:true,user:params.id,message:'User Deleted successfully',user:user});
    } catch (error) {
        console.log("error===>",error);
        return NextResponse.json({
            status: 404,
            success : false,
            message:error
        })
    }
}



export const PUT = async(request,{params}) =>{
    await connectDB();

    try {
        const userId = params.id;
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({
                status: 404,
                success : false,
                message:'User not found'
            })
        }

        user.activated = !user.activated;
        await user.save();
        return NextResponse.json({stauts:200,success:true,user:params.id,message:'task updated successfully',user:user});
    } catch (error) {
        console.log("error===>",error);
        return NextResponse.json({
            status: 404,
            success : false,
            message:error
        })
    }
}