import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';

function Add({setIsAdding,employees,setEmployees}) {

    const [employeeId, setEmployeeId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [salary, setSalary] = useState('')
    const [date, setDate] = useState('')

    const inputText = useRef(null);

    useEffect(()=>{
        inputText.current.focus();
    },[])

    const handleSubmit =(e)=>{
        e.preventDefault()

        if(!firstName || !lastName || !employeeId || !email || !salary || !date){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            })
        }
        const id = employees.length + 1;
        const addedEmployee = {
            id,
            firstName,
            lastName,
            employeeId,
            email,
            salary,
            date
          }
          
          const updatedEmployees = [...employees, addedEmployee];
          setEmployees(updatedEmployees);
          setIsAdding(false);      

        Swal.fire({
            icon:'success',
            title: 'Added!',
            text: `${firstName} ${lastName}'s data has been Added.`,
            showConfirmButton:  false,
            timer: 2000
        })
    }

    return (
        <div className='small-container'>
            <form onSubmit={handleSubmit}>
                <h2>Add Employee</h2>

                <label htmlFor='firstName'>First Name</label>
                <input
                    id="firstName"
                    type="text"
                    ref={inputText}
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor='lastName'>Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor='employeeId'>Employee ID</label>
                <input
                    id="employeeId"
                    type="text"
                    name="employeeId"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                />
                <label htmlFor='email'>Email Id</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='salary'>Salary</label>
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
                <label htmlFor='date'>Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <div style={{marginTop: '30x'}}>
                    <input
                        type="submit"
                        value= "Add"
                    />
                    <input
                        type="button"
                        value = "Cancel"
                        onClick={()=>setIsAdding(false)}
                        className="muted-button"
                        style={{marginLeft:'12px'}}
                    />
                </div>
            </form>
        </div>
    )
}

export default Add
