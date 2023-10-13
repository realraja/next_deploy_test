import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    user: {type: String,required: true},
    role: {type: String,required: true},
    email: { type: String, required: true },
    img: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    ischeck: { type: Boolean, required: true,default: false },
    commentAt: { type: Date},
    createdAt: {type: Date,default: Date.now}
  },
  { timestamps: true }
);

const Message = mongoose.models.Messages || mongoose.model("Messages", MessageSchema);

export default Message;
