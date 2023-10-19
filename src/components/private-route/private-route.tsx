import { Navigate } from 'react-router-dom';
import { AutoriztionStatus } from '../../const';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  autoriztionStatus: AutoriztionStatus;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { autoriztionStatus, children } = props;

  return (
    autoriztionStatus === AutoriztionStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
