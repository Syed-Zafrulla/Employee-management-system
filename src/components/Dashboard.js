import React, {useState} from 'react';
import Add from './Add';
import Edit from './Edit';
import Header from './Header';
import List from './List';
import {employeesData} from '../data/employeeData';
import Swal from 'sweetalert2';

function Dashboard() {
    const[employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (id)=>{
        const [selEmployee] = employees.filter(emp=> emp.id === id);
        setSelectedEmployee(selEmployee);
        setIsEditing(true);
    }

    const handleDelete =(id)=>{
        Swal.fire({
            icon:'warning',
            title:'Are you sure?',
            text: "You won't be able to revert this record!",
            showConfirmButton: true,
            showCancelButton:true,
            confirmButtonText:"Yes, Delete it!",
            cancelButtonText: "No, Cancel !"
        }).then(result =>{
            if(result.value){
              const [employee] = employees.filter(emp=> emp.id === id);
                
                Swal.fire({
                    icon:'success',
                    title:'Deleted!',
                    showConfirmButton:false,
                    timer: 1800,
                    text:`${employee.firstName}'s data has been deleted.`
                });
              const currentEmployees = employees.filter(emp => emp.id !== id);
              setEmployees(currentEmployees);
            }
        })
    }

  return (
    <div>
      {!isAdding && !isEditing && (
        <>
            <Header setIsAdding= {setIsAdding}/>
            <List
                employees = {employees}
                handleEdit =  {handleEdit}
                handleDelete = {handleDelete}
            />
        </>
      )}

      {isAdding && (
        <Add
        setIsAdding = {setIsAdding}
        employees = {employees}
        setEmployees ={setEmployees}
        />
      )}

      {isEditing && (
        <Edit
          selectedEmployee = {selectedEmployee}
          setIsEditing = {setIsEditing}
          employees = {employees}
          setEmployees = {setEmployees}
        />
      )}
    </div>
  )
}

export default Dashboard
