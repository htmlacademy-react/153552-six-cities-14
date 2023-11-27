import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../../const';
import { AppRoute } from '../../const';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
  authorizationStatus: AuthStatus;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;

  return (
    <>
      {authorizationStatus === AuthStatus.Unknown && <Spinner></Spinner>}
      {authorizationStatus === AuthStatus.Auth && children}
      {authorizationStatus === AuthStatus.NoAuth && <Navigate to={AppRoute.Login}></Navigate>}
    </>
  );
}
