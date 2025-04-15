import mongoose from "mongoose";




const connectDB = async() =>{
    const MONGODB_URI = process.env.DB_URL;
    try{
        const {connection} = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'HisabApp'
        });
        console.log("MongoDB Connected,",connection.host);
    }catch(err){
        console.log('error=>',err)
    }
}

export default connectDB;


// import mongoose from "mongoose";




// const connectDB = async() =>{
//     const MONGODB_URI = 'mongodb+srv://realllraja:RajeshKumar@clusterecommerce.anyzj4h.mongodb.net/';
//     try{
//         const connection = await mongoose.connect(MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             dbName: 'HisabApp'
//         });
//         console.log("MongoDB Connected")
//     }catch(err){
//         console.log('error=>',err)
//     }
// }

// export default connectDB;
