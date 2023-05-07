import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Add from './Add';

describe('Add component', () => {
  it('should add a new employee when the form is submitted', () => {
    const setIsAdding = jest.fn();
    const employees = [];
    const setEmployees = jest.fn();

    const { getByLabelText, getByText } = render(
      <Add setIsAdding={setIsAdding} employees={employees} setEmployees={setEmployees} />
    );

    fireEvent.change(getByLabelText('First Name'), { target: { value: 'Syed' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Zafrulla' } });
    fireEvent.change(getByLabelText('Employee ID'), { target: { value: '123' } });
    fireEvent.change(getByLabelText('Email Id'), { target: { value: 'syed.zafrulla@ibm.com' } });
    fireEvent.change(getByLabelText('Salary'), { target: { value: '50000' } });
    fireEvent.change(getByLabelText('Date'), { target: { value: '2022-10-05' } });

    fireEvent.click(getByText('Add'));

    expect(setEmployees).toHaveBeenCalledTimes(1);
    expect(setEmployees).toHaveBeenCalledWith([
      {
        id: 1,
        firstName: 'Syed',
        lastName: 'Zafrulla',
        employeeId: '123',
        email: 'syed.zafrulla@ibm.com',
        salary: '50000',
        date: '2022-10-05',
      },
    ]);

    expect(setIsAdding).toHaveBeenCalledTimes(1);
    expect(setIsAdding).toHaveBeenCalledWith(false);
  });

  it('should show an error message when the form is submitted with missing fields', () => {
    const setIsAdding = jest.fn();
    const employees = [];
    const setEmployees = jest.fn();

    const { getByText } = render(
      <Add setIsAdding={setIsAdding} employees={employees} setEmployees={setEmployees} />
    );

    fireEvent.click(getByText('Add'));

    expect(setEmployees).not.toHaveBeenCalled();
    expect(setIsAdding).not.toHaveBeenCalled();
    expect(getByText('All fields are required.')).toBeInTheDocument();
  });
});
