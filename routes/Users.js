const router =require("express").Router();


const verifyToken=require("../middleware/verify");
const Users = require("../models/Users");



router.get("/",(req,res)=>{
res.send("Api is working")
})


router.get("/all",verifyToken,async(req,res)=>{
    try {
        const data =await Users.find();
        res.json({users:data})
    } catch (error) {
        res.json({msg:error.message}) 
    }
    })
    
    


    //lead creation
router.post("/add",verifyToken,async(req,res)=>{
 try {
    
    const data =await Users.create(req.body);
    res.json({msg:"User added succesfully"})
 } catch (error) {
    res.json({msg:error.message})
 }
})


//lead delete


router.delete("/delete/:id",verifyToken,async(req,res)=>{
 
try {
    const result =await Users.findByIdAndDelete(req.params.id);
    res.json({msg:"User removed Successfully"})
} catch (error) {
    res.json({msg:error.message})
} 
})


router.get("/single/:id",verifyToken,async(req,res)=>{

     try {
        const data =await Users.findById(req.params.id);
        res.json(data);
     } catch (error) {
        res.json({msg:error.message})
     }
})

router.put("/update/:id",verifyToken,async(req,res)=>{

    try {
        const data =await Users.findByIdAndUpdate(req.params.id,req.body);
    res.json({msg:"Lead Updated succesfully",data})
    } catch (error) {
        res.json({msg:error.message})
    }
})


module.exports =router;