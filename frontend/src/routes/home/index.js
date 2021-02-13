import { h } from 'preact';
import {useState,useEffect} from 'preact/hooks';
import style from './style.css';
import List from 'preact-fluid/src/List/List.js';
import ListItem from 'preact-fluid/src/List/ListItem.js'
import ListHeader from 'preact-fluid/src/List/ListHeader.js';
import ListSection from 'preact-fluid/src/List/ListSection.js';
import ListFooter from 'preact-fluid/src/List/ListFooter.js';
import Button from 'preact-fluid/src/Button/Button.js';
import Card from 'preact-fluid/src/Card/Card';
import CardHeader from 'preact-fluid/src/Card/CardHeader';
import CardFooter from 'preact-fluid/src/Card/CardFooter';
import CardBody from 'preact-fluid/src/Card/CardBody';
import Dialog, { DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import {getAllDepartment,getDepartment,createDepartment,updateDepartment,deleteDepartment} from '../../api/departmentAPI';


const Home = () => {
    const [dialog, setDialog] = useState("CLOSED");
	const [list,setlist]=useState([]);
	const [Department,setDepartment]=useState({
	     department_name:"",
		 firstname:"",
		 lastname:"",
		 role:0,
		 code:91,
		 number:"",
		 email:"",
		 org_type:"Bussiness"
	});
	const {department_name,firstname,lastname,role,code,number,email,org_type}=Department;
    const handleChange=name=>event=>{
		setDepartment({...Department,[name]:event.target.value});
	}
	const submit=event=>{
		event.preventDefault();
		let data={
			department_name:department_name,
			hod:{
				firstname:firstname,
				lastname:lastname,
				role:role,
				phone:{
					code:code,
					number:number
				},
				email:email
			},
			org_type:org_type
		}
		createDepartment(data).then(data=>{
			if(data.error){
				console.log("error in db")
			}else{
				setDepartment({
					department_name:"",
					firstname:"",
					lastname:"",
					role:0,
					code:91,
					number:"",
					email:"",
					org_type:"Bussiness"
			   });
			}
		}).catch(e=>console.log(e))
	};

	const GetAllDepartment=()=>{
		getAllDepartment().then(data=>{
			if(data.error){
				console.log("error in db");
			}else{
				
				setlist(data);
			}
		}).catch(e=>console.log('err'));
	}
	useEffect(()=>{
		GetAllDepartment();
	},[]);
	return (
		<div class={style.home}>		

          <center><Button onClick={()=> setDialog("OPEN")} rounded style={{float:'right',margin:10}}>Add</Button></center>
		  <Dialog
          isOpen={dialog === "OPEN"}
          onDismiss={() => setDialog("CLOSED")}
          >
          <h1>Create Department</h1>
		  <Card style={{padding:20,marginTop:10,width:"100%",background:"#F5F5F5"}}>
         
		 <form style={{paddingTop:20,paddingBottom:20}}>
	
			<label style={{fontSize:20,color:"#000", fontWeight:'bold'}}  for="dp-name">Department Name
				 : </label>
			<input id="dp-name" onChange={handleChange("department_name")} value={department_name} style={{
					height:40,
					outline:'none',
					fontSize:18
				 }}
				for="org-type"
				type="text"
			  	placeholder="Department Name"
			/>
			&nbsp;
			 <label id="org-type" style={{fontSize:20,color:"#000", fontWeight:'bold'}} for="o-select">Type:</label>
            <select onChange={handleChange("org_type")} value={org_type} style={{
					height:30,
					width:120,
					outline:'none',
					fontSize:18
				 }} id="o-select">
            <option  value="Bussiness">Bussiness</option>
            <option value="Corporate">Corporate</option>
            </select>

			<h3>HOD INFO</h3>
			<label style={{fontSize:20,color:"#000", fontWeight:'bold'}}  for="f-name">Name
				 : </label>
				 <input id="f-name" onChange={handleChange("firstname")} value={firstname} style={{
					
					height:40,
					outline:'none',
					fontSize:18
				 }}
				type="text"
				for="l-name"
			  	placeholder="First Name"
				/>
				&nbsp;
				<input id="l-name" onChange={handleChange("lastname")} value={lastname} style={{
					marginLeft:2,
					height:40,
					outline:'none',
					fontSize:18
				 }}
				type="text"
			  	placeholder="Last Name"
				/>
             <br/>
			 <br/>
			 &nbsp;
         	<label style={{fontSize:20,color:"#000", fontWeight:'bold'}}  for="code">Phone : </label>
            <select style={{
					height:40,
					width:65,
					outline:'none',
					fontSize:18
				 }} onChange={handleChange("code")} value={code} id="code" for="number">
            <option  value="91">+91</option>
            </select>
				&nbsp;
		    <input id="number" onChange={handleChange("number")} value={number} style={{
					marginLeft:2,
					height:40,
					outline:'none',
					fontSize:18
				 }}
				//type="tel"
				//pattern="[0-9]{10}"
				//required
			  	placeholder="Phone Number"
				/>
		 
		   <br/>
		   <br/>
		   &nbsp;
		   <label id="l-label" style={{fontSize:20,color:"#000", fontWeight:'bold'}}  for="email">Email : </label>
			    &nbsp;
				<input id="" style={{
					marginLeft:2,
					height:40,
					outline:'none',
					fontSize:18
				 }}
				onChange={handleChange("email")}
				value={email}
				type="email"
			  	placeholder="Enter Email"
				/>
			 </form>
			
			 <cenetr>
			 <Button onClick={submit} rounded style={{float:'right',width:80}}>
				 Save
			 </Button>
			 </cenetr>
		  </Card>


        </Dialog>
		  <List style={{background:"#F5F5F5",width:"100%"}}>
			 <ListHeader
			 title="Department List"			 
			 />		 
			 
			<ListSection>
                 {list.map((department)=>{
					 return (
						<Card style={{margin:10}}>
							<CardHeader
							title="Department name"
							/>
							<CardBody>
								<p style={{color:"#000"}}>Name: Jhon Ray (HOD) <br/> phone: 982989112 <br/> email: email@gmail.com </p>
							</CardBody>

							<CardFooter
							right={
								<p>
									<Button rounded  style={{float:'right',margin:10,borderColor:"#D82E2F",color:"#D82E2F"}}>Delete</Button>
									<Button rounded style={{float:'right',margin:10,color:"#00D84A",borderColor:"#00D84A"}}>Update</Button>
								</p>
							}
							/>
						</Card>
					 )
				 })}
			</ListSection>
			<ListFooter
			right={
				<p>pagination</p>
			}
			/>
			</List>

			
		
	   </div>
	);
};

export default Home;
