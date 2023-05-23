import { Navigate } from "react-router-dom";

function ProtectedRoute({
  isLoggedIn,
  redirectTo,
  component: Component,
  ...props
}) {
  return isLoggedIn ? <Component {...props} /> : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
