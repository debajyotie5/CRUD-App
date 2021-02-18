import {API} from '../backend';
import axios from 'axios';

//get all department by get network request
export const getAllDepartment=async (page)=>{
   try{
    let res=await fetch(`${API}/get-all-departments?page=${page}`,{
        method:'get',
        Accept: 'application/json'
    });
    let data=res.json();
    return data;
   }catch(data){
       console.log(data);
   }
};
//get  department by get network request
export const getDepartment=async (id)=>{ 
        try{
        let res=await fetch( `${API}/get-department/${id}`,{
            method:'get',
            headers: {
                Accept: "application/json",
            }
        });
        let data=res.json();
        return data;
        }catch(data){
           console.log(data);
        }
};
//create department
export const createDepartment=async(department)=>{
       try{
        let res=await fetch(`${API}/create-department`,{
            method:'post',
            headers: {
                Accept: "application/json",
                'Content-Type':'application/json'
            },
            body:JSON.stringify(department)
        });
        let data=res.json();
        return data;
       }catch(data){
           console.log(data);
       };
};
//update department
export const updateDepartment=async (id,department)=>{
    
       try{
        let res=await fetch(`${API}/update-department/${id}`,{
            method:'put',
            headers: {
                Accept: "application/json",
                'Content-Type':'application/json'
            },
            body:JSON.stringify(department)
        });
        let data=res.json();
        return data;
       }catch(data){
           console.log(data);
       };

};
//delete department
export const deleteDepartment=async(id)=>{
    
       try{
        let res=await fetch(`${API}/delete-department/${id}`,{
            method:'delete',
        });
        let data=res.json();
        return data;
       }catch(data){
           console.log(data);
       };

};
//total department
export const totalDepartment=async()=>{
    try{
        let res=await fetch(`${API}/total-department`,{
            method:'get',
            Accept: 'application/json'
        });
        let data=res.json();
        return data;
       }catch(data){
           console.log(data);
       }
};
