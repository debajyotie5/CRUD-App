'use strict';

const departmentHandler=require('../controllers/department');
const Joi=require('joi');



module.exports = [
    {
        method:'post',
        path:'/create-department',
        options:{
            validate: {
                payload: Joi.object({
                    department_name:Joi.string().min(3).max(120).required(),
                    hod:{
                        firstname:Joi.string().min(3).max(30).required(),
                        lastname:Joi.string().min(3).max(30).required(),
                        phone:{
                             code:Joi.number().required(),
                             number:Joi.string().required()
                        },
                        email:Joi.string().required()
                     },
                    org_type:Joi.string().required()
                })
            }
        },
        handler:departmentHandler.create
    },
    {
        method:'put',
        path:'/update-department/{id}',
        options:{
            validate: {
                payload: Joi.object({
                    department_name:Joi.string().min(3).max(120).required(),
                    hod:{
                        firstname:Joi.string().min(3).max(30).required(),
                        lastname:Joi.string().min(3).max(30).required(),
                        phone:{
                             code:Joi.number().required(),
                             number:Joi.string().required()
                        },
                        email:Joi.string().required()
                     },
                    org_type:Joi.string().required()
                })
            }
        },
        handler:departmentHandler.update
    },
    {   //query parameters will be passed {limit,page}
        method:'get',
        path:'/get-all-departments',
        handler:departmentHandler.list
    },
    {
        method:'get',
        path:'/get-department/{id}',
        handler:departmentHandler.get
    },
    {
        method:'delete',
        path:'/delete-department/{id}',
        handler:departmentHandler.delete
    },
    {
        method:'get',
        path:'/total-department',
        handler:departmentHandler.total
    }
]