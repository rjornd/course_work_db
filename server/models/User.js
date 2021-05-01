const {Schema, model} = require("mongoose");

const User = new Schema({
    nickname: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, required: false}
    //posts: [{type: ObjectId, ref: 'Post'}]
});

module.exports = model('User', User); 