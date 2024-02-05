import { useParams } from 'react-router-dom';
import useAPIView from '../../hooks/useAPIView';
import { useState } from 'react';

export default function GymView() {
  const [disabled, setDisabled] = useState(true);
  const { id } = useParams();
  const path = `gymbranches/${id}`;
  const {
    data: gymbranch,
    setData: setGymBranch,
    init,
    setInit,
    isLoading,
    url,
  } = useAPIView(path);

  function handleChange(e) {
    const { name, value } = e.target;
    setGymBranch((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <h1>Gym Details</h1>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <form>
          <label>Gym Name</label>
          <input type="text" name="gymName" value={gymbranch.name} disabled />
          <label>Email</label>
          <input
            type="text"
            value={gymbranch.email}
            onChange={handleChange}
            disabled={disabled}
          />
        </form>
      )}
    </>
  );
}
