import React from 'react'

function List({employees,handleDelete,handleEdit}) {

    const formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: null
    })

  return (
    <div className='contain-table'>
      <table>
  <thead>
    <tr>
      <th>Sl.no</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Employee ID</th>
      <th>Email id</th>
      <th>Salary</th>
      <th>Date</th>
      <th colSpan={2} className="text-center">Actions</th>
    </tr>
  </thead>
  
  <tbody>
    {employees.length>0 ?(
        employees.map((employee,i)=>(
            <tr key={employee.id}>
               <td>{i+1}</td>
               <td>{employee.firstName}</td>     
               <td>{employee.lastName}</td>   
               <td>{employee.employeeId}</td>  
               <td>{employee.email}</td>     
               <td>{formatter.format(employee.salary)}</td>     
               <td>{employee.date}</td>
               <td className='text-right'>
                    <button onClick={()=> handleEdit(employee.id)}>Edit</button>
                </td>     
                <td className='text-left'>
                    <button onClick={()=> handleDelete(employee.id)}>Delete</button>
                </td>
            </tr>
        ))
    ):(
        <tr>
            <td colSpan={8}>No Employees</td>
        </tr>
    )}
  </tbody>
</table>
    </div>
  )
}

export default List
