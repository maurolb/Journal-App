import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ isLogedIn, children }) => {
  return isLogedIn
    ? <Navigate to="/" />
    : children
};
