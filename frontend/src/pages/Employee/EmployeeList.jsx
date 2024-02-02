import { Link } from 'react-router-dom';
import { useAPIList } from '../../hooks/useAPIList';
import RequestOptions from '../../utils/requestClass';
export default function EmployeeList() {
  // const [employees, setEmployees] = useState([]);
  // const [loading, setLoading] = useState(false);

  const path = `employees`;
  const {
    data: employees,
    setData: setEmployees,
    isLoading,
    url,
  } = useAPIList(path);

  function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete?');

    if (confirmed) {
      const empUrl = `${url}/${id}`;
      const request = new RequestOptions('DELETE');

      fetch(empUrl, request.options)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          alert(`${json.message}`);
        });
      setEmployees((prev) => prev.filter((item) => item._id !== id));
    }
  }
  return (
    <>
      <h1>Employee List</h1>
      <Link to={'/employees/create'}>Create Employee</Link>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.age}</td>
                <td>{emp.dob.slice(0, 10)}</td>
                <td>{emp.gender}</td>
                <td>{emp.address}</td>

                <td>
                  <Link to={`/employees/${emp._id}`}>View</Link>
                  <button onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
