import connectDB from "@/database"
import Post from "@/models/post";
import { NextResponse } from "next/server";





export const PUT = async(request,{params}) =>{
    await connectDB();

    try {
        const postId = params.id;
        const post = await Post.findById(postId);
        if(!post){
            return NextResponse.json({
                status: 404,
                success : false,
                post:'post not found'
            })
        }

        post.ischeck = !post.ischeck;
        await post.save();
     
        return NextResponse.json({stauts:200,success:true,message:'successful',post:post});
    } catch (error) {
        console.log("error===>",error);
        return NextResponse.json({
            status: 404,
            success : false,
            post:error
        })
    }
}
export const GET = async(request,{params}) =>{
    await connectDB();

    try {
        const postId = params.id;
        const post = await Post.find({id:postId});
        if(!post){
            return NextResponse.json({
                status: 404,
                success : false,
                post:'post not found'
            })
        }

     
        return NextResponse.json({stauts:200,success:true,message:'successful',post:post});
    } catch (error) {
        console.log("error===>",error);
        return NextResponse.json({
            status: 404,
            success : false,
            post:error
        })
    }
}