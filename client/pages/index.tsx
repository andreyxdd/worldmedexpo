import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Typography, Button } from '@mui/material';

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

/**
 * This is the landing page.
 * @return {JSX.Element}
 */
// eslint-disable-next-line no-unused-vars
const Landing: NextPage = (props): JSX.Element => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/home');
  };
  return (
    <div>
      <Typography variant='h4'>
        This is a landing page
      </Typography>
      <Typography variant='body1'>
        This page helps better understand out business model.
      </Typography>
      <Button onClick={handleClick} variant='outlined' type='button'>
        Procced to home page
      </Button>
    </div>
  );
};

export default Landing;
