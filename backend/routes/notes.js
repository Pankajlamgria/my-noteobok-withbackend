const express = require("express");
const notedatabase=require("../models/Notes")
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");

router.get("/fetchnotes",fetchuser, async(req, res)=>{
    try{
        let user_id=req.userdetail.id;
        let notes=await notedatabase.find({user:user_id});
        res.json(notes);
    }
    catch(err){
        res.send("Internal Server Error");
    }
});
router.post("/addnotes",fetchuser, async(req, res)=>{
    try{
        let data=req.body;
        if(data.title==""){
            res.send("Please enter some relevant Tittle");
        }
        if(data.description.length<2){
            res.send("please enter the understandable description");
        }
        note=await notedatabase.create({
            user:req.userdetail.id,
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag

        });
        return res.status(200).json(note);
    }
    catch(err){
        res.send("Internal Server Error");
    }
});

// updating the notes data
router.put("/update/:id",fetchuser, async(req, res)=>{
    try{
        const {title,description,tag}=req.body;
        let note=await notedatabase.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note does not exits");
        }
        let updatednote={};
        if(title){updatednote.title=title};
        if(description){updatednote.description=description};
        if(tag){updatednote.tag=tag};
        if(req.userdetail.id!=note.user.toString()){
            return res.send("Administration excess denied ");
        }
        note=await notedatabase.findByIdAndUpdate(req.params.id,{$set:updatednote},{new:true});
        return res.send(note);
        
    }
    catch(err){
        console.log(err);
        res.send("Internal Server Error");
    }
});
router.delete("/delete/:id",fetchuser,async(req,res)=>{
    try{
        let notesdata=await notedatabase.findById(req.params.id);
        if(!notesdata){
            return res.status(404).send("Note does note exits.");
        }
        if(req.userdetail.id!=notesdata.user){
            return res.status(404).send("Administration excess denied.");
        }
        await notedatabase.findByIdAndDelete(req.params.id);
        res.json({"success":"data has been successfuly deleted.",note:notesdata});

    }
    catch(err){
        res.json({"error":err});
    }
})

module.exports = router;