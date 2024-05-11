import { Link } from 'react-router-dom';

export default function LinkButtonComponent({ children, path }) {
  return (
    <Link style={{ color: '#5bc9c9' }} to={path}>
      {children}
    </Link>
  );
}
