import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import UserWidget from 'scenes/widgets/UserWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import AdvertWidget from 'scenes/widgets/AdvertWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding={isNonMobileScreens ? '2rem' : '1rem'}
        display={isNonMobileScreens ? 'flex' : 'block'}
        justifyContent='space-between'
      >
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
        )}
        <Box flexBasis={isNonMobileScreens ? '42%' : undefined}>
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            <FriendListWidget userId={_id} />
            <Box m='1rem 0' />
            <AdvertWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
