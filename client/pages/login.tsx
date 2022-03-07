import React from 'react';
import { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import SkeletonLoader from '../components/LoginForm/SkeletonLoader';
import useRedirect from '../customHooks/useRedirect';
import useLayout from '../customHooks/useLayout';
import ClientOnlyDiv from '../components/ClientOnlyDiv';

const LoginForm = dynamic(
  () => import('../components/LoginForm/LoginForm'),
  { loading: () => <SkeletonLoader />, ssr: false },
);

interface ILoginPageProps {}

const Login: NextPage<ILoginPageProps> = () => {
  const user = useRedirect({ after: 6, where: '/home', whom: 'user' });
  useLayout({ showNavbar: false, showTransition: false, containerMaxWidth: 'xs' });

  return (
    <ClientOnlyDiv>
      {!user ? (
        <LoginForm />
      ) : (
        <Typography
          variant='h5'
          sx={{
            fontStyle: 'italic',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          You are already logged in
        </Typography>
      )}
    </ClientOnlyDiv>
  );
};
export default Login;
