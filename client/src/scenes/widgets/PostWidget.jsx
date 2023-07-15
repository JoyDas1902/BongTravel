import {
  ChatBubble,
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Send,
  ShareOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from '@mui/material';
import { hover } from '@testing-library/user-event/dist/hover';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const userPicture = useSelector((state) => state.user.picturePath);
  const { firstName, lastName } = useSelector((state) => state.user);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState('');

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const postComment = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comment`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPicture,
          name: `${firstName} ${lastName}`,
          comment,
        }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment('');
  };

  let isVideo = false;
  let isAudio = false;

  if (picturePath) {
    const parts = picturePath.split('.');
    const extention = parts[parts.length - 1].toLowerCase();

    switch (extention) {
      case 'mp4':
      case 'm4v':
      case 'avi':
      case 'mpg':
        isVideo = true;
    }

    switch (extention) {
      case 'mp3':
      case 'aac':
      case 'wav':
      case 'flac':
        isAudio = true;
    }
  }

  return (
    <WidgetWrapper m='1rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        userId={loggedInUserId}
      />

      <Typography color={main} sx={{ mt: '0.5rem' }}>
        {description}
      </Typography>

      {picturePath && (
        <>
          <img
            width='100%'
            height='auto'
            alt=''
            style={{ borderRadius: '0.25rem', marginTop: '0.5rem' }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
          {isVideo && (
            <video
              width='100%'
              height='auto'
              autoPlay
              muted
              controls
              style={{ borderRadius: '0.25rem', marginTop: '0.5rem' }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}
          {isAudio && (
            <audio
              controls
              style={{ borderRadius: '0.25rem', marginTop: '0.5rem' }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}
        </>
      )}

      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined style={{ color: 'red' }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween>
            <IconButton onClick={() => setIsComments(!isComments)}>
              {isComments ? <ChatBubble /> : <ChatBubbleOutline />}
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box mt='0.5rem'>
          <Divider sx={{ margin: '0.5rem 0' }} />
          <FlexBetween gap='0.25rem'>
            <InputBase
              placeholder='Write a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                width: '100%',
                backgroundColor: palette.neutral.light,
                borderRadius: '2rem',
                padding: '0.5rem 1rem',
              }}
            />
            <IconButton
              onClick={postComment}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                  color: primary,
                },
              }}
            >
              <Send />
            </IconButton>
          </FlexBetween>

          {comments.map((c, i) => (
            <Box key={`${name}-${i}`} mt='0.5rem'>
              <FlexBetween
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <UserImage image={c.userPicture} size='30px' />
                <Typography color={main} variant='h5' fontWeight='500'>
                  {c.name}
                </Typography>
              </FlexBetween>
              <Typography color={main} ml='2.25rem'>
                {c.comment}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
