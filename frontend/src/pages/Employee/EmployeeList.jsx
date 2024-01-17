import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/employees`;
    const request = {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    };
    setLoading(true);
    fetch(url, request)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setEmployees(json.employees);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Employee List</h1>
      <Link to={'/employees/create'}>Create Employee</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.dob}</td>
                <td>{emp.gender}</td>
                <td>{emp.age}</td>
                <td>{emp.address}</td>

                <td>
                  <Link to={`/employees/${emp._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
