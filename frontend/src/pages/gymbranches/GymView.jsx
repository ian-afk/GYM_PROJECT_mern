import { useParams } from 'react-router-dom';

export default function GymView() {
  const { id } = useParams;
  return (
    <>
      <h1>Gym Details</h1>
      <form>
        <label>Gym Name</label>
        <input type="text" />
        <label>Email</label>
        <input type="text" value={id} />
      </form>
    </>
  );
}
