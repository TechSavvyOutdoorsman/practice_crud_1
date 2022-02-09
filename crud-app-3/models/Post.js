import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        maxlength: [30]
    },
    description: {
        type: String,
        required: true,
        maxlength: [400]
    }
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema)