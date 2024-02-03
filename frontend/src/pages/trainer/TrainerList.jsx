import { Link } from 'react-router-dom';
import { useAPIList } from '../../hooks/useAPIList';
import RequestOptions from '../../utils/requestClass';

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
    const request = new RequestOptions('DELETE');

    async function deleteTrainer() {
      const res = await fetch(trainerUrl, request.options);
      const json = await res.json();

      setTrainers((prev) => prev.filter((el) => el._id !== id));
      alert(json.message);
    }
    if (confirm) {
      deleteTrainer();
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
                <th>Trainer</th>
                <th>Experties</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer._id}>
                  <td>{trainer.employees[0].fullName}</td>
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
