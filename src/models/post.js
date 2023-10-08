import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    village: String,
    imageUrl: String,
    massage: String,
    time: Number,
    ischeck: Boolean,
    checked: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

const Post =
  mongoose.models.Posts || mongoose.model("Posts", PostSchema);

export default Post;
