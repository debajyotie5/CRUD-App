const departmentHandler=require('../controllers/department');
const Joi=require('joi');

// config:{
//     handler: (request, h) =>{

//         let notes= db.query("select * from product_details")
//         //console.log(notes);
//         return notes;
//     },
//     description: 'Get product data',
//     notes: 'product Get request',
//     tags: ['api'],
//     validate: {
//         failAction: Relish.failAction,
//     }   
// }

module.exports = [
    {
        method:'post',
        path:'/create-department',
        options:{
            validate: {
                payload: Joi.object({
                    department_name:Joi.string().min(1).max(30).required(),
                    hod:{
                        firstname:Joi.string().min(3).max(20).required(),
                        lastname:Joi.string().min(3).max(20).required(),
                        role:Joi.number().max(2).required(),
                        phone:{
                             code:Joi.number().valid(91).required(),
                             number:Joi.string().length(10).pattern(/^[0-9]+$/).required()
                        },
                        email:Joi.string().email().required()
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
                    department_name:Joi.string().min(1).max(30).required(),
                 hod:{
                        firstname:Joi.string().min(3).max(20).required(),
                        lastname:Joi.string().required(),
                        role:Joi.number().max(2).required(),
                        phone:{
                             code:Joi.number().valid(91).required(),
                             number:Joi.string().length(10).pattern(/^[0-9]+$/).required()
                        },
                        email:Joi.string().email().required()
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
    }
]