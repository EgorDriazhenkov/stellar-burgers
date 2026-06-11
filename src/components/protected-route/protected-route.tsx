import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import {
  selectIsAuthChecked,
  selectUser
} from '../../services/user/user-slice';

interface ProtectedRouteProps {
  children: React.ReactElement;
  IsAuth?: boolean; // true - только для неавторизованных, false - только для авторизованных
}

export const ProtectedRoute = ({
  children,
  IsAuth = false
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (IsAuth) {
    if (!user) {
      return children;
    }

    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (user) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace />;
};
