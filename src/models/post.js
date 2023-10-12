import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    village: String,
    imageUrl: String,
    id: String,
    timeh: String,
    timem: String,
    machines: Number,
    ischeck: {
      type: Boolean,
      default: false,
    },
    createDate:Array,
    checkedAt: Date,
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
