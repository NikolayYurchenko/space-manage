import mongoose, { Schema } from 'mongoose'

let userSchema = new Schema({
    local: {
        username:String,
        password:String,
    },
    google: {
        id:String,
        email:String,
        name:String,
        picturePath:String,
    }
})    

const UserPost = mongoose.model('Users', userSchema);
export default UserPost;