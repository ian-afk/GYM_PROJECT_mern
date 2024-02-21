import { useNavigate, useParams } from 'react-router-dom';
import useAPIView from '../../hooks/useAPIView';
import { useState } from 'react';
import LinkButtonComponent from '../../components/LinkButtonComponent';
import RequestOptions from '../../utils/requestClass';
import { useAuth } from '../../context/AuthContext';
import NotLoggedIn from '../../components/NotLoggedIn';

export default function GymView() {
  const [disabled, setDisabled] = useState(true);
  const { token, isLoggedIn, setIsLoggedIn } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const path = `gymbranches/${id}`;
  const {
    data: gymbranches,
    setData: setGymBranches,
    init,
    setInit,
    isLoading,
    url,
    message,
  } = useAPIView(path, token, setIsLoggedIn);

  function handleChange(e) {
    const { name, value } = e.target;
    setGymBranches((prev) => {
      const newGBranch = { ...prev };
      if (name === 'address') {
        newGBranch.gymLocation = { [name]: value };
        return newGBranch;
      }
      return { ...prev, [name]: value };
    });
  }

  function handleEdit() {
    setDisabled(!disabled);
    setGymBranches(init);
  }

  function handleDelete() {
    const confirm = window.confirm('Are you sure you want to delete');

    const request = new RequestOptions('DELETE', token);
    async function deleteGym() {
      const res = await fetch(url, request.options);
      const json = await res.json();

      alert(json.message);
      navigate(`/gymbranches`);
    }
    if (confirm) {
      deleteGym();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      email: gymbranches.email,
      gymLevel: gymbranches.gymLevel,
      gymLocation: { address: gymbranches.gymLocation.address },
    };
    const request = new RequestOptions('PATCH', token, body);
    async function postGymbranch() {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      console.log(json);
      setGymBranches(json.gymbranches);
      setInit(json.gymbranches);

      setDisabled(true);
    }

    if (!isModified(init, gymbranches)) postGymbranch();
    else alert('Gymbranch is not modified');

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
          <h1>Gym Details</h1>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Gym Name</label>
              <input
                type="text"
                name="gymName"
                value={gymbranches.name}
                disabled
              />
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={gymbranches.email}
                onChange={handleChange}
                disabled={disabled}
              />
              <br />
              <label>Gym Manager</label>
              {/* <select>
            <option value={gymbranches.employees[]}></option>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
          </select> */}
              <label>Gym Level</label>
              <input
                type="text"
                name="gymLevel"
                value={gymbranches.gymLevel}
                onChange={handleChange}
                disabled={disabled}
              />
              <p>Location :</p>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={gymbranches?.gymLocation?.address ?? ''}
                onChange={handleChange}
                disabled={disabled}
              />
              <br />
              {!disabled && <button type="submit">Save</button>}
              <button type="button" onClick={handleEdit}>
                {disabled ? 'Edit' : 'Cancel'}
              </button>
              {disabled && (
                <button
                  type="button"
                  onClick={() => handleDelete(gymbranches._id)}
                >
                  Delete
                </button>
              )}
              <LinkButtonComponent path={'/gymbranches'}>
                Back to list
              </LinkButtonComponent>
            </form>
          )}
        </>
      )}
    </>
  );
}
