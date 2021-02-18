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
import {getAllDepartment,getDepartment,totalDepartment,createDepartment,updateDepartment,deleteDepartment} from '../../api/departmentAPI';


const Home = () => {
    const [dialog, setDialog] = useState("CLOSED");
	const [fData,setfData]=useState({
		title:"",
		itemId:"",
		view:0, //0-create/update delete-1
		op:0//0-create and 1- update operation
	});//used to control the form view and operation
	const {title,itemId,view,op}=fData;
	const [list,setlist]=useState([]);
	const [total,settotal]=useState(0);
	const [page,setpage]=useState(1);
	const [currentPage,setcurrentPage]=useState(1);
	const [Department,setDepartment]=useState({
	     department_name:"",
		 firstname:"",
		 lastname:"",
		 code:91,
		 number:"",
		 email:"",
		 org_type:"Bussiness"
	});
	const {department_name,firstname,lastname,code,number,email,org_type}=Department;
  
	const handleChange=name=>event=>{
		setDepartment({...Department,[name]:event.target.value});
		if(name=="code"){
		var form=phoneNumberFormet.find(e=>e.code==event.target.value);
		setmessage(`write in this format ${form.format}`)//set message depending on the country code selection
		}
	};//handle data
	const FormView=()=>{
		return (
			<div>
				{view==0?(
					

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
				  }} type='text' id="o-select">
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
				  }} onChange={handleChange("code")} type='text' value={code} id="code" for="number">
			 <option  value="91">+91</option>
			 <option  value="1">+1</option>
			 </select>
				 &nbsp;
			 <input id="number" onChange={handleChange("number")} value={number} style={{
					 marginLeft:2,
					 height:40,
					 outline:'none',
					 fontSize:18
				  }}
				   onKeyUp={onNumberInput(code)}
				   placeholder="Phone Number"
				 />
				 <br/>
				 <p style={{color:"#000"}}> {message}</p>
			<br/>
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
				 type="text"
				   placeholder="Enter Email"
				 />
				 <br/>
				  <p style={{color:"#000"}}> Email format should be like this test@gmail.com</p>
			  </form>
			  <cenetr>
			     {op==0?(
				 <Button onClick={submit} rounded style={{float:'right',width:80}}>
					  Save
				  </Button>
				 ):(
				<Button onClick={update(itemId)} rounded style={{float:'right',width:80}}>
					Update
				</Button>
				 )}
			  </cenetr>
		   </Card>
 
				):(
					
					<Card  style={{padding:20,marginTop:10,width:"100%",border:'none',outline:'none'}}>
						<cenetr>
					<Button onClick={DeleteDepartment(itemId)} rounded style={{float:'right',width:80}}>
						Delete
					</Button>
					</cenetr>
					</Card>
					
				)}
			</div>
		)
	};//form view
	const [message,setmessage]=useState("write in this format 7187898290");//show hint message when user select country code and used to show error message
	const phoneNumberFormet=[
		{
			code:91,
			regx:/^[0-9]{10}/,
			format:"7187898290"
		},
		{
			code:1,
			regx:/^[0-9]{3}-[0-9]{3}-[0-9]{4}/,
			format:"123-234-1234"
		}
	];//phone number fot=rmats
	const onNumberInput=code=>event=>{
		var val = event.target.value;
		val=val.toString();
		var form=phoneNumberFormet.find(e=>e.code==code);
		var result = val.match(form.regx);
		result=result.join();
		setDepartment({...Department,number:result})
	};//set number input restriction depending the country code
	const onWrongNumberFormat=number=>{
		var form=phoneNumberFormet.find(e=>e.code==code);
		var check=form.regx.test(number.toString());
		return check;
	};//validate number format
	const validateEmail=email=>{
     var mailFormat=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
     var check=mailFormat.test(email.toString());
	 return check;
	};//validate email
    //paginate
	const prev=()=>{
		if(currentPage<=page&&currentPage!=1){
			GetAllDepartment(currentPage-1);
		 	setcurrentPage(currentPage-1);
	    }
	};
	const next=()=>{
		if(currentPage<page){
		   GetAllDepartment(currentPage+1);	
		   setcurrentPage(currentPage+1);
		}
	};

	//API Calls
	const submit=event=>{
		event.preventDefault();
		let fname=firstname.trim(),lname=lastname.trim();
		let data={
			department_name:department_name,
			hod:{
				firstname:firstname.trim(),
				lastname:lastname.trim(),
				phone:{
					code:code,
					number:number.trim()
				},
				email:email.trim(),
			},
			org_type:org_type
		}
		if(department_name.length<3){
			alert("Sorry enter valid input department min length is 3")
		}else if(fname.length<3){
			alert("Sorry enter valid input hod first name min length is 3")
		}else if(lname.length<3){
			alert("Sorry enter valid input hod last name min length is 3")
		}else if(onWrongNumberFormat(number)==false){
		    alert(message);
	    }else if(validateEmail(email)==false){
			alert("You have entered an invalid email address!")
		}else{
			createDepartment(data).then(data=>{
				setDepartment({
					department_name:"",
					firstname:"",
					lastname:"",
					code:91,
					number:"",
					email:"",
					org_type:"Bussiness"
			   });
			   GetAllDepartment();
			}).catch(err=>console.log(err));
		}	

	};//create department and assign hod
	const update=id=>event=>{
		event.preventDefault();
		let fname=firstname.trim(),lname=lastname.trim();
		let data={
			department_name:department_name,
			hod:{
				firstname:firstname.trim(),
				lastname:lastname.trim(),
				phone:{
					code:code,
					number:number.trim()
				},
				email:email.trim(),
			},
			org_type:org_type
		}
		if(department_name.length<3){
			alert("Sorry enter valid input department min length is 3")
		}else if(fname.length<3){
			alert("Sorry enter valid input hod first name min length is 3")
		}else if(lname.length<3){
			alert("Sorry enter valid input hod last name min length is 3")
		}else if(onWrongNumberFormat(number)==false){
		    alert(message);
	    }else if(validateEmail(email)==false){
			alert("You have entered an invalid email address!")
		}else{	 
		 updateDepartment(id,data).then(data=>{
			setDepartment({
				department_name:"",
				firstname:"",
				lastname:"",
				code:91,
				number:"",
				email:"",
				org_type:"Bussiness"
		   });
			GetAllDepartment();
			setDialog("CLOSE");
		 }).catch(err=>console.log(err))
	    }
	};//update department and assign hod
	const DeleteDepartment=id=>event=>{
		event.preventDefault();
		deleteDepartment(id).then(data=>{
			GetAllDepartment();
			setDialog("CLOSE")
		}).catch(err=>console.log('err'))
	
	};//delete department
	const GetAllDepartment=async (currentPage)=>{
		let res=await getAllDepartment(currentPage);
		setlist(res);
		Total();
	}//get all departments
	const Total=async ()=>{
		let res=await totalDepartment();
		settotal(res.total);
		setpage(res.page);
	};//get total item

	useEffect(()=>{
		GetAllDepartment();
	},[]);

	return (
	  <div class={style.home}>		
          {/*open form to add department*/}
          <center><Button onClick={()=>{
			   setDepartment({
				department_name:"",
				firstname:"",
				lastname:"",
				code:91,
				number:"",
				email:"",
				org_type:"Bussiness"
		       });//restoring the values
			   setfData({
				   ...fData,
				   title:"Create Department",
				   op:0,
				   view:0
			   });//setting up the form view and operaton
			   setDialog("OPEN");//open dialog
		  }} rounded style={{float:'right',margin:10}}>Add</Button></center>
		  <Dialog
          isOpen={dialog === "OPEN"}
          onDismiss={() => setDialog("CLOSED")}
          >
          <h1>{title}</h1>
		  {FormView()}
        </Dialog>
		  <List style={{background:"#F5F5F5",width:"100%"}}>
			 <ListHeader
			 title={`Total Department:  ${total}`}			 
			 />		 
			 
			<ListSection>
                 {list.map((department)=>{
					 return (
						<Card style={{margin:10}}>
							<CardHeader
							title={department.department_name}
							/>
							<CardBody>
								<p style={{color:"#000"}}>Name: {department.hod.firstname} {department.hod.lastname} (HOD) <br/> phone: +{department.hod.phone.code} {department.hod.phone.number} <br/> email: {department.hod.email} </p>
							</CardBody>

							<CardFooter
							right={
								<p>
		 {/* delete opeartion */}	<Button rounded onClick={()=>{
										setfData({
											...fData,
											title:`${department.department_name} are you sure ?`,
											view:1,
											itemId:department._id
										});//setting up form view and operaion
									   setDialog("OPEN");//open dialog
									}} style={{float:'right',margin:10,borderColor:"#D82E2F",color:"#D82E2F"}}>Delete</Button>
		 {/* update opration */}	<Button rounded onClick={()=>{
										setfData({
											...fData,
											title:`Update ${department.department_name}`,
											view:0,
											op:1,
											itemId:department._id
										});//setting up form view and opearion
										setDepartment({
											department_name:department.department_name,
											firstname:department.hod.firstname,
											lastname:department.hod.lastname,
											code:department.hod.phone.code,
											number:department.hod.phone.number,
											email:department.hod.email,
											org_type:department.org_type
									    });//storing selected department data
									   setDialog("OPEN");//open dialog
									}} style={{float:'right',margin:10,color:"#00D84A",borderColor:"#00D84A"}}>Update</Button>
								</p>
							}
							/>
						</Card>
					 )
				 })}
			</ListSection>
			<ListFooter
			right={
				<p>
				{/* next */}	<Button onClick={next} style={{float:'right',margin:10,color:"#000",borderColor:"#000"}}>Next</Button>
				<p style={{float:'right',margin:10,color:"#000",fontSize:30}}>{currentPage}</p>
				{/* previous */}	<Button onClick={prev} style={{float:'right',margin:10,borderColor:"#000",color:"#000"}}>Prev</Button>
			    </p>
			 }
			/>
			</List>	
	   </div>
	  );
};

export default Home;
