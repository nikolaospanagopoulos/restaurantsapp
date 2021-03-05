import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    rating: {
        type: Number,
        required:true
    },
    comment: {
        type: String,
        required: true,
        minlength:[10,'A comment should have more than 10 characters']
    }
}, {
    timestamps:true
})



export {reviewSchema}