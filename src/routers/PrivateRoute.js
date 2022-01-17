import { Navigate} from 'react-router-dom';

export const PrivateRoute = ({ isLogedIn, children }) => {

  return isLogedIn
    ? children
    : <Navigate to="/auth/login" />
};
