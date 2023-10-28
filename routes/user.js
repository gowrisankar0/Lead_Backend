const router =require("express").Router();
const User =require("../models/user");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken=require("../middleware/verify");
const pwd ="xgheiilpbqvpjcgp";
const email ="gsankar9797@gmail.com";




router.get("/",(req,res)=>{
    res.send("User route is working");
});


//user sign-up
router.post("/signup",async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password,salt);
        const user =new User({
            name:req.body.name,
            email:req.body.email,
            password,
        });
        const data =await user.save();
        const token =jwt.sign({id:data._id},"secretkey")

        res.json({msg:"signed up succesfully"});
    } catch (error) {
        console.log({msg:error.message});
    }
});




//user login
router.post("/login",async (req,res)=>{
try {
    const user = await User.findOne({email:req.body.email});
    if(user){
        const result = await bcrypt.compare(req.body.password,user.password);
       if(result){
             const token = jwt.sign({id:user._id},"secretkey")
             return res.json(token)
       }else{
        return res.json({msg:"wrong password"})
       }
    }else{
        return res.json({msg:"no user found"});
    }
} catch (error) {
    return res.json({msg:error.message})
}
})

//user get data

router.get("/data",verifyToken,async(req,res)=>{
    console.log("random")
try {
    const userId =req.userId;
    const user = await User.findById(userId).select("-password");
    res.json(user)
} catch (error) {
    console.log({msg:error.message});
    res.json({})
}
})



router.get("/verify/:token",async(req,res)=>{
    try {
        const token =req.params.token;
        jwt.verify(token,"secretkey",async(err,decoded)=>{
            if(err){
                return res.json({msg:"invalid Url"})
            }else{
                const user=await User.findByIdAndUpdate(decoded.id,{verified:true}) 
            }
            return res.json({msg:"Account veriifed"})
        })
        
    } catch (error) {
        
    }
})
module.exports=router;