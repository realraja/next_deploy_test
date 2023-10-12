import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    user: {type: String,required: true},
    name: {type: String,required: true},
    email: { type: String, required: true },
    img: { type: String, required: true },
    comment: { type: String, required: true },
    createDate:Array,
    commentAt: { type: Date},
    createdAt: {type: Date,default: Date.now}
  },
  { timestamps: true }
);

const Comment = mongoose.models.Comments || mongoose.model("Comments", CommentSchema);

export default Comment;
