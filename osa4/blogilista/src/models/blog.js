const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2, 
    },
    author: {
        type: String,
        required: true,
        minlength: 2,
    },
    url: {
        type: String,
        required: true,
        unique: true

    },
    likes: {
        type: Number,
        minlength: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})



module.exports = mongoose.model('Blog', blogSchema)