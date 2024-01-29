import { Link } from 'react-router-dom';

export default function LinkButtonComponent({ children, path }) {
  return <Link to={path}>{children}</Link>;
}
