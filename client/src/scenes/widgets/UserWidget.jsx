import {
  LocationOnOutlined,
  WorkOutlineOutlined,
  GroupOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import UserImage from 'components/UserImage';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const SERVER_URL = process.env.SERVER_URL;

  const getUser = async () => {
    const response = await fetch(`${SERVER_URL}/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap='0.5rem'
        pb='1rem'
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap='1rem'>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant='h4'
              color={dark}
              fontWeight='500'
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <FlexBetween gap='0.25rem' style={{ justifyContent: 'start' }}>
              <GroupOutlined sx={{ color: main }} />
              <Typography color={medium}>{friends.length} friends</Typography>
            </FlexBetween>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      <Box p='1rem 0'>
        <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
          <WorkOutlineOutlined fontSize='medium' sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem'>
          <LocationOnOutlined fontSize='medium' sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box p='1rem 0'>
        <FlexBetween mb='0.5rem'>
          <Typography color={medium}>Profile views</Typography>
          <Typography color={main} fontWeight='500'>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Post impression</Typography>
          <Typography color={main} fontWeight='500'>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
