import mongoose, { Schema } from 'mongoose'

const PostSchema = new Schema({
    userId: String,
    spaceId: String,
    name: String,
    content: Object,
}, { timestamps: true, });

const Post = mongoose.model('TodoLists', PostSchema);

export default Post;