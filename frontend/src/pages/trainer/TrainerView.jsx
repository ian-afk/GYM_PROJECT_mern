import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LinkButtonComponent from '../../components/LinkButtonComponent';
import useAPIView from '../../hooks/useAPIView';
import RequestOptions from '../../utils/requestClass';
import { useAuth } from '../../context/AuthContext';
import NotLoggedIn from '../../components/NotLoggedIn';

export default function TrainerView() {
  const { token, isLoggedIn, setIsLoggedIn } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const path = `trainers/${id}`;
  const {
    data: trainer,
    setData: setTrainer,
    init,
    setInit,
    isLoading,
    url,
    message,
  } = useAPIView(path, token, setIsLoggedIn);

  function handleEdit() {
    setIsDisabled(!isDisabled);
    setTrainer(init);
  }
  function handleDelete() {
    const confirm = window.confirm('Are you sure you want to delete?');

    const request = new RequestOptions('DELETE', token);
    async function deleteTrainer() {
      const res = await fetch(url, request.options);
      const json = await res.json();

      alert(json.message);
      navigate('/trainers');
    }
    if (confirm) {
      deleteTrainer();
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      experties: trainer.experties,
    };
    const request = new RequestOptions('PATCH', token, body);

    async function postTrainer() {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();
      console.log(json);

      setTrainer(json.trainers);
      setInit(json.trainers);
      setIsDisabled(!isDisabled);
    }

    if (!isModified(init, trainer)) postTrainer();
    else alert('Trainer is not modified');

    function isModified(init, current) {
      return JSON.stringify(init) === JSON.stringify(current);
    }
  }
  return (
    <>
      {!isLoggedIn ? (
        <NotLoggedIn message={message} />
      ) : (
        <>
          <h1>Trainer Details</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Trainer</label>
              <input
                type="text"
                disabled
                value={trainer?.employees?.[0]?.fullName ?? ''}
              />
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
      )}
    </>
  );
}
