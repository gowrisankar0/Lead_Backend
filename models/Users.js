const mongoose =require('mongoose');

const Userschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    adress:{
        type:String,
        require:true
    },
    contact:{
        type:Number,
        require:true
    },
    enquiry:{
        type:String,
        require:true
    }
},{timestamps:true})


const Users =mongoose.model("lead-datas",Userschema)

module.exports=Users