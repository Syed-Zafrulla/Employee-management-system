import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { employeesData } from '../data/employeeData';

function Edit({setIsEditing, selectedEmployee,employees, setEmployees}) {

  const id = selectedEmployee.id;
  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [employeeId, setEmployeeId] = useState(selectedEmployee.employeeId);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [salary, setSalary] = useState(selectedEmployee.salary);
  const [date, setDate] = useState(selectedEmployee.date);

  const inputText = useRef(null)

  useEffect(()=>{
    inputText.current.focus();
  },[])

  const editHandler =(e)=>{
    e.preventDefault();

    if(!firstName || !lastName || !employeeId || !email || !salary || !date){
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'All fields are required.',
        showConfirmButton:true
      })
    } 

    const updatedEmployee = {
      id,
      firstName,
      lastName,
      employeeId,
      email,
      salary,
      date
    }

    for(let i=0; i<employees.length; i++){
      if(employees[i].id===id){
        employees.splice(i,1,updatedEmployee);
        break;
      }
    }
    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon:"success",
      title:"Updated!",
      text: `${updatedEmployee.firstName}'s data has been updated.`,
      showConfirmButton:false,
      timer:1600
    })
  }

  return (
    <div className='small-container'>
      <form onSubmit={editHandler}>
        <h2>Edit Employee Information</h2>
        <label htmlFor="firstName">First Name</label>
        <input 
          id='firstName'
          type="text"
          name= "firstName"
          ref= {inputText}
          value= {firstName}
          onChange = {(e)=> setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input 
          id='lastName'
          type="text"
          name= "lastName"
          value= {lastName}
          onChange = {(e)=> setLastName(e.target.value)}
        />
        <label htmlFor="employeeId">Employee Id</label>
        <input 
          id='employeeId'
          type="text"
          name= "employeeId"
          value= {employeeId}
          onChange = {(e)=> setEmployeeId(e.target.value)}
        />
        <label htmlFor="email">Email Id</label>
        <input 
          id='email'
          type="email"
          name= "email"
          value= {email}
          onChange = {(e)=> setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salary</label>
        <input 
          id='salary'
          type="number"
          name= "salary"
          value= {salary}
          onChange = {(e)=> setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input 
          id='date'
          type="date"
          name= "date"
          value= {date}
          onChange = {(e)=> setDate(e.target.value)}
        />

        <div style={{marginTop:'30px'}}>
          <input 
          type="submit"
          value = "Update"
          />
          <input
            type="button"
            value= "Cancel"
            onClick={()=> setIsEditing(false)}
            className= "muted-button"
            style={{marginLeft:"12px"}}
          />
          
        </div>
      </form>
    </div>
  )
}

export default Edit
