import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAPIList } from '../../hooks/useAPIList';

export default function TrainerList() {
  const path = `trainers`;
  const {
    data: trainers,
    setData: setTrainers,
    isLoading,
    url,
  } = useAPIList(path);

  function handleDelete(id) {
    const confirm = window.confirm('Are you sure you want to delete?');
    const trainerUrl = `${url}/${id}`;
    if (confirm) {
      const request = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(trainerUrl, request)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setTrainers((prev) => prev.filter((el) => el._id !== id));
        });
    }
  }
  return (
    <>
      <h1>Trainer List</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Link to={'/trainers/create'}>Create Trainer</Link>
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
                    <button
                      type="button"
                      onClick={() => handleDelete(trainer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
