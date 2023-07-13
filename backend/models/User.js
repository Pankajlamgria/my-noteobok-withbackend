const mongoose= require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,requried:true,unique:true},
    password:{type:String,requried:true}, 
    date:{type:Date,default:Date.now},
});

// by this mongoose.model function a database will be created of data will get append in the table of name {Users}
const User=  mongoose.model('User',UserSchema);

// this is to check whether the collection already exits or not
// User.createIndexes();
module.exports=User;