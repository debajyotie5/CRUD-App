'use strict';
const mongoose=require('mongoose');

var departmentSchema=new mongoose.Schema({
    department_name:{type:String,required:true},//stores department Name
    hod:{
        firstname:{type:String,required:true,minLength:3,maxlength:20},//Assigned user ex- HOD Name
        lastname:{ type:String,require:true,minLength:3,maxlength:20},//.........
        role:{type:Number,max:2,default:0},// differ by role 0 Means HOD
        phone:{code:{type:Number},number:{type:String,unique:true,length:10,required:true}},//HOD phone Number
        email:{type:String,unique: true,required: true },//HOD Email
    },
    org_type:{type:String,required: true},//Org Type ex- bussiness or corporate
});

module.exports=mongoose.model("Department",departmentSchema);