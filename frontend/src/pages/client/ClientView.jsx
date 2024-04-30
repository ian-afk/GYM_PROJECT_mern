import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LinkButtonComponent from '../../components/LinkButtonComponent';
import useAPIView from '../../hooks/useAPIView';
import RequestOptions from '../../utils/requestClass';
import { useAuth } from '../../context/AuthContext';
import NotLoggedIn from '../../components/NotLoggedIn';
import styles from './ClientView.module.css';

export default function ClientView() {
  const { token, isLoggedIn, setIsLoggedIn } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const path = `clients/${id}`;
  const {
    data: client,
    setData: setClient,
    isLoading,
    url,
    init,
    setInit,
    message,
  } = useAPIView(path, token, setIsLoggedIn);

  function handleChange(e) {
    const { name, value } = e.target;

    setClient((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleEdit() {
    setDisabled(!disabled);
    setClient(init);
  }

  function handleDelete() {
    const confirm = window.confirm('Are you sure you want to delete?');

    const request = new RequestOptions('DELETE', token);
    async function deleteClient() {
      const res = await fetch(url, request.options);
      const json = await res.json();

      alert(json.message);
      navigate(`/clients`);
    }
    if (confirm) {
      deleteClient();
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      firstName: client.firstName,
      lastName: client.lastName,
      age: client.age,
      gender: client.gender,
      address: client.address,
      email: client.email,
    };
    const request = new RequestOptions('PATCH', token, body);

    async function postEmployee() {
      const res = await fetch(url, request.postOptions);
      const json = await res.json();

      setInit(json.clients);
      setDisabled(true);
    }

    if (!isModified(init, client)) postEmployee();
    else alert('Client is not modified');

    function isModified(init, current) {
      return JSON.stringify(init) === JSON.stringify(current);
    }
  }
  return (
    <>
      {!isLoggedIn ? (
        <NotLoggedIn message={message} />
      ) : (
        <div className={styles.clientView}>
          <h1>Client Details</h1>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={client.firstName}
                onChange={handleChange}
                disabled={disabled}
              />
              <br />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={client.lastName}
                onChange={handleChange}
                disabled={disabled}
              />
              <br />
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={client.age}
                onChange={handleChange}
                disabled={disabled}
              />
              <br />
              <label>Gender</label>
              <select
                value={client.gender}
                name="gender"
                onChange={handleChange}
                disabled={disabled}
                required
              >
                <option value="male">MALE</option>
                <option value="female">FEMALE</option>
              </select>
              <br />
              <label>Address</label>
              <input
                type="text"
                value={client.address}
                name="gymLocation.address"
                onChange={handleChange}
                disabled={disabled}
              />
              <br />
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={client.email}
                onChange={handleChange}
                disabled={disabled}
              />
              {!disabled && <button type="submit">Save</button>}
              <button
                className={styles['btn-primary']}
                type="button"
                onClick={() => handleEdit()}
              >
                {disabled ? 'Edit' : 'Cancel'}
              </button>
              {disabled && (
                <button
                  className={styles['btn-secondary']}
                  type="button"
                  onClick={() => handleDelete(client._id)}
                >
                  Delete
                </button>
              )}
              <LinkButtonComponent path={'/clients'}>
                Back to list
              </LinkButtonComponent>
            </form>
          )}
        </div>
      )}
    </>
  );
}
