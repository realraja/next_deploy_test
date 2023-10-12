import connectDB from "@/database"
import User from "@/models/user";
import { NextResponse } from "next/server";
import Post from "@/models/post";



export const GET = async(request) =>{
    await connectDB();

    try {
        const post = await Post.find().sort({$natural:-1});
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

export const POST = async(req)=>{
    const {email,machines,hour,minutes} = await req.json();
    if(!machines || !hour || !minutes){
        return NextResponse.json({
            status: 400,
            success: false,
            post: 'please fill all fields',
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
                post: 'You are not registered yet. Please register now',
            });
        }

        const isUserTodayPost = await Post.find({email}).limit(1).sort({$natural:-1});

        const today = new Date().getDate();
        const lastPostDay = await isUserTodayPost[0]?.createdAt?.getDate();
        if(today === lastPostDay){
            return NextResponse.json({
                status: 400,
                success: false,
                post: "You already a post Today,please add a post tommorow!",
                date: today,
                PostDate: lastPostDay,
                finalData: isUserTodayPost,
            });
        }

        const newPost = await Post.create({
            email,
            name:isUserExist?.name,
            village:isUserExist?.village,
            imageUrl:isUserExist?.photoURL,
            id:isUserExist?._id,
            timeh:hour,
            timem:minutes,
            createDate:[new Date().getDate(),new Date().getMonth() +1,new Date().getFullYear(),new Date().getHours(),new Date().getMinutes(),new Date().getSeconds()],
            machines,
        })


        return NextResponse.json({
            status: 200,
            success: true,
            post: 'Your post sent successfully',
            date: today,
            PostDate: lastPostDay,
            finalData: newPost,
        });

    } catch (error) {
        console.log('error in post', error);
        return NextResponse.json({
            status: 400,
            success: false,
            post: 'error in post|| please try again later',
        })
    }

    
}