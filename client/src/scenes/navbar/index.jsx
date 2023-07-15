import { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
  Whatshot,
  Person,
  Home,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout, setSearchText } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';

const Navbar = () => {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const searchText = useSelector((state) => state.searchText);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding='0.7rem 3%' backgroundColor={alt}>
      <FlexBetween gap={isNonMobileScreens ? '1.75rem' : '0.5rem'}>
        <Typography
          fontWeight='bold'
          fontSize={isNonMobileScreens ? 'clamp(1rem, 2rem, 2.25rem)' : '16px'}
          color='primary'
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          Bong Travel
        </Typography>
        <FlexBetween
          backgroundColor={neutralLight}
          borderRadius='2rem'
          padding={
            isNonMobileScreens
              ? '0.5rem 1.5rem 0.5rem 0.5rem'
              : '0.25rem'
          }
        >
          <Search style={{ marginInline: '0.5rem' }} />
          <InputBase
            placeholder='Search...'
            onChange={(e) => {
              dispatch(setSearchText(e.target.value));
            }}
          />
        </FlexBetween>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap='2rem'>
          <IconButton onClick={() => navigate('/home')}>
            <Home sx={{ color: dark, fontSize: '25px' }} />
          </IconButton>
          <IconButton onClick={() => navigate(`/trending/${user._id}`)}>
            <Whatshot sx={{ color: dark, fontSize: '25px' }} />
          </IconButton>
          <IconButton onClick={() => navigate(`/profile/${user._id}`)}>
            <Person sx={{ color: dark, fontSize: '25px' }} />
          </IconButton>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <FormControl variant='standard' value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '2rem',
                p: '0.25rem 1rem',
                '& .MuiSvgIcon-root': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem
                value={fullName}
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position='fixed'
          right='0'
          bottom='0'
          width='170px'
          height='100%'
          zIndex='10'
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display='flex' justifyContent='flex-end' p='1rem'>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap='0.5rem'
          >
            <FlexBetween
              borderRadius='2rem'
              padding='0.5rem 2rem'
              gap='0.25rem'
              sx={{
                '&:hover': {
                  backgroundColor: neutralLight,
                  cursor: 'pointer',
                },
                width: '80%',
              }}
              onClick={() => navigate('/home')}
            >
              <Home sx={{ color: dark, fontSize: '25px' }} />
              <Typography>Home</Typography>
            </FlexBetween>
            <FlexBetween
              borderRadius='2rem'
              padding='0.5rem 2rem'
              gap='0.25rem'
              sx={{
                '&:hover': {
                  backgroundColor: neutralLight,
                  cursor: 'pointer',
                },
                width: '80%',
              }}
              onClick={() => navigate(`/trending/${user._id}`)}
            >
              <Whatshot sx={{ color: dark, fontSize: '25px' }} />
              <Typography>Trending</Typography>
            </FlexBetween>
            <FlexBetween
              borderRadius='2rem'
              padding='0.5rem 2rem'
              gap='0.25rem'
              sx={{
                '&:hover': {
                  backgroundColor: neutralLight,
                  cursor: 'pointer',
                },
                width: '80%',
              }}
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              <Person sx={{ color: dark, fontSize: '25px' }} />
              <Typography>Profile</Typography>
            </FlexBetween>
            <FlexBetween
              borderRadius='2rem'
              padding='0.5rem 2rem'
              gap='0.25rem'
              sx={{
                '&:hover': {
                  backgroundColor: neutralLight,
                  cursor: 'pointer',
                },
                width: '80%',
              }}
              onClick={() => dispatch(setMode())}
            >
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
              <Typography>Theme</Typography>
            </FlexBetween>
            <FormControl variant='standard' value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '2rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem
                  value={fullName}
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
