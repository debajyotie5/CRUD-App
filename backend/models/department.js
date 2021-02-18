'use strict';
const mongoose=require('mongoose');

var departmentSchema=new mongoose.Schema({
    department_name:{type:String,minLength:3,maxlength:120,unique:true,required:true},//stores department Name
    hod:{
        firstname:{type:String,required:true,minLength:3,maxlength:30},//Assigned user ex- HOD Name
        lastname:{ type:String,required:true,minLength:3,maxlength:30},//.........
        phone:{code:{type:Number,required:true},number:{type:String,unique:true,required:true}},//HOD phone Number
        email:{type:String,unique:true,required: true },//HOD Email
    },
    org_type:{type:String,required: true},//Org Type ex- bussiness or corporate
});
module.exports=mongoose.model("Department",departmentSchema);