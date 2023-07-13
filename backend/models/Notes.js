const mongoose= require('mongoose')

const { Schema } = mongoose;

const NoteSchema = new Schema({
    // created a foreign key (connection between the id of collection name User)
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    
    title:{type:String,required:true},
    description:{type:String,requried:true},
    tag:{type:String,default:"imp"},
    date:{type:Date,default:Date.now},
});
module.exports=mongoose.model('note',NoteSchema)