import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='0.5rem 6%'
        textAlign='center'
      >
        <Typography fontWeight='bold' fontSize='32px' color='primary'>
          Bong Travel
        </Typography>
      </Box>

      <Box
        m={isNonMobileScreens ? '4rem' : '1rem'}
        maxWidth={isNonMobileScreens ? '75%' : undefined}
        display='grid'
        gridTemplateColumns='repeat(2, minmax(0, 1fr))'
        sx={{
          '& > div': { gridColumn: isNonMobileScreens ? undefined : 'span 2' },
        }}
      >
        {isNonMobileScreens && (
          <Box className='imgStyle'>
            <div className='cartoonImg'></div>
            <div className='cloud_one'></div>
            <div className='cloud_two'></div>
          </Box>
        )}

        <Box
          p='2rem'
          backgroundColor={theme.palette.background.alt}
          borderRadius={!isNonMobileScreens && '1rem'}
          style={{
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
            textAlign: 'center',
          }}
        >
          <Typography
            fontWeight='bold'
            fontSize='32px'
            color='primary'
            mb='1rem'
          >
            Explore
          </Typography>
          <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
            Bong Travel, & share amazing travel stories with the world.
          </Typography>
          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
