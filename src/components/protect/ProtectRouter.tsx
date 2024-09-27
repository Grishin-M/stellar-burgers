import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import {
  selectAuth,
  selectUser
} from '../../services/slices/userSlice/userSlice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectRouter = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const isAuth = useSelector(selectAuth);

  if (!isAuth) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from ?? { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
