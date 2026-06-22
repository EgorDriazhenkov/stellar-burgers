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
  isAuth?: boolean;
}

export const ProtectedRoute = ({
  children,
  isAuth = false
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!isAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
