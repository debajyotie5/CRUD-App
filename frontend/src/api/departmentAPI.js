import {API} from '../backend';
import axios from 'axios';

//get all department by get network request
export const getAllDepartment=()=>{
    fetch(`${API}/get-all-departments`).then(response =>response.json()).catch(error =>{
        console.log(error)
    })
};
//get  department by get network request
export const getDepartment=(id)=>{
    fetch(`${API}/get-department/${id}`,{
        method:'get',
        headers: {
            Accept: "application/json",
        }
    }).then(response => {
      return response.json();
    }).catch(error =>{
        console.log(error)
    })
};
//create department
export const createDepartment=(department)=>{
    fetch(`${API}/create-department`,{
        method:'post',
        headers: {
            Accept: "application/json",
            'Content-Type':'application/json'
        },
        payload:JSON.stringify(department)
    }).then(response => {
      return response.json();
    }).catch(error =>{
        console.log(error)
    })
};
//update department
export const updateDepartment=(id,department)=>{
    fetch(`${API}/update-department/${id}`,{
        method:'put',
        headers: {
            Accept: "application/json",
            'Content-Type':'application/json'
        },
        body:JSON.stringify(department)
    }).then(response => {
      return response.json();
    }).catch(error =>{
        console.log(error)
    })
};
//delete department
export const deleteDepartment=(id)=>{
    fetch(`${API}/delete-department/${id}`,{
        method:'delete',
        headers: {
            Accept: "application/json",
        }
    }).then(response => {
      return response.json();
    }).catch(error =>{
        console.log(error)
    })
};


