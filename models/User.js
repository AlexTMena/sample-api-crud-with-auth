const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        minLength: [4, 'Password must be atleast 4 characters']
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User