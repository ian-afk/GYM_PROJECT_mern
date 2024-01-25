import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function TrainerList() {
  const [loading, setLoading] = useState(false);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/trainers`;
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setLoading(true);
    fetch(url, request)
      .then((res) => res.json())
      .then((json) => {
        setTrainers(json.trainers);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <h1>Trainer List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Experties</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id}>
              <td>{trainer.employee.firstName}</td>
              <td>{trainer.employee.lastName}</td>
              <td>{trainer.experties}</td>
              <td>
                <Link to={`/trainers/${trainer._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
