import mongoose, { Schema } from 'mongoose'

const PostSchema = new Schema({
    userId: String,
    name: String,
    description: String,
    coverPath: String,
}, { timestamps: true });

const Post = mongoose.model('Spaces', PostSchema);

export default Post;