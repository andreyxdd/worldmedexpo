import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonLoader = () => (
  <Stack
    spacing={4}
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Skeleton sx={{ m: 2 }} variant='circular' width={60} height={60} />
    <Skeleton variant='rectangular' width={360} height={52} />
    <Skeleton variant='rectangular' width={360} height={52} />
    <Skeleton sx={{ mt: 2, mb: 4 }} variant='rectangular' width={360} height={35} />
  </Stack>
);

export default SkeletonLoader;
