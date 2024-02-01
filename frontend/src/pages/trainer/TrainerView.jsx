import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LinkButtonComponent from '../../components/LinkButtonComponent';

export default function TrainerView() {
  const [loading, setLoading] = useState(false);
  const [trainer, setTrainer] = useState({
    experties: '',
    fullName: '',
  });
  const [init, setInit] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_API_URL}/trainers/${id}`;
  useEffect(() => {
    async function getTrainer() {
      try {
        const request = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };

        setLoading(true);
        const res = await fetch(url, request);
        const json = await res.json();

        const newTrainer = json.trainer;
        newTrainer.fullName = `${newTrainer.employee.firstName} ${newTrainer.employee.lastName}`;
        setTrainer(newTrainer);
        setInit(newTrainer);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getTrainer();
  }, []);

  function handleEdit() {
    setIsDisabled(!isDisabled);
    setTrainer(init);
  }
  function handleDelete() {
    const confirm = window.confirm('Are you sure you want to delete?');

    if (confirm) {
      const request = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(url, request)
        .then((res) => res.json())
        .then(() => {
          navigate('/trainers');
        });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const request = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        experties: trainer.experties,
      }),
    };

    fetch(url, request)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const newTrainer = json.trainer;
        newTrainer.fullName = `${newTrainer.employee.firstName} ${newTrainer.employee.lastName}`;
        setTrainer(newTrainer);
        setInit(newTrainer);
        setIsDisabled(!isDisabled);
      });
  }
  return (
    <>
      <h1>Trainer Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Trainer's Name</label>
          <input type="text" disabled value={trainer.fullName} />
          <br />
          <label>Experties</label>
          <input
            type="text"
            name="experties"
            value={trainer.experties}
            onChange={(e) =>
              setTrainer((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            disabled={isDisabled}
          />
          {!isDisabled && <button type="submit">Save</button>}
          <button type="button" onClick={handleEdit}>
            {isDisabled ? 'Edit' : 'Cancel'}
          </button>
          {isDisabled && (
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          )}
          <LinkButtonComponent path="/trainers">
            Back to list
          </LinkButtonComponent>
        </form>
      )}
    </>
  );
}
