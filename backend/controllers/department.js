'use strict';

const Department = require('../models/department');

exports.create=(req,h)=>{
    return Department.create(req.payload).then((department) => {
        return { message: "department created successfully", department: department };
     }).catch((err) => {
       return { err: err };
     });
};

exports.update=(req,h)=>{
  return Department.findOneAndUpdate({_id:req.params.id},{$set:req.payload},{new:true,useFindAndModify:false}).then((department)=>{
    if(!department){throw "Depertment Does not exist"}else{ return { message: "department updated successfully", department: department }};
  }).catch((err)=>{
       return { err: err };
  })
};

exports.list=(req,h)=>{
  
  let {limit=10,page=1}=req.query;
  return Department.find().skip((parseInt(page)-1)*parseInt(limit)).limit(parseInt(limit)).then(departments=>{
  return departments;
  }).catch((err)=>{
       return { err: err };
  });
};

exports.get=(req,h)=>{
  return Department.findById(req.params.id).then((department)=>{
    if(!department){throw "Depertment Does not exist"}else{return { message: "fetched department data successfully", department: department };}
  }).catch((err)=>{
       return { err: err };
  });
};

exports.delete=(req,h)=>{
  return Department.findOneAndDelete({_id:req.params.id}).then((department)=>{
    if(!department){throw "Depertment Does not exist"}else{ return { message: "department deleted successfully", department: department }};
  }).catch((err)=>{
       return { err: err };
  });
}