import {
  ChatBubble,
  ChatBubbleOutline,
  Facebook,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  MailOutline,
  Send,
  Share,
  ShareOutlined,
  Twitter,
  WhatsApp,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
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
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
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
  const [anchorEl, setAnchorEl] = useState(null);

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

  const getTimeAgoFromDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const timeDifference = now.getTime() - postDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    } else {
      return seconds <= 1 ? `just now` : `${seconds} seconds ago`;
    }
  };

  const postDate = new Date(createdAt);
  const timeAgo = getTimeAgoFromDate(postDate);
  console.log(timeAgo);

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

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleShare = async (platform) => {
    closeMenu();
    switch (platform) {
      case 'Facebook':
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}`;
        window.open(facebookShareUrl, '_blank');
        break;

      case 'WhatsApp':
        const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          'Check out this post: ' + window.location.href
        )}`;
        window.open(whatsAppShareUrl, '_blank');
        break;

      case 'Twitter':
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          'Check out this post: ' + window.location.href
        )}`;
        window.open(twitterShareUrl, '_blank');
        break;

      case 'Email':
        const emailSubject = 'Check out this post!';
        const emailBody = `I found an interesting post. Check it out: ${window.location.href}`;
        const emailShareUrl = `mailto:?subject=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = emailShareUrl;
        break;

      default:
        console.log(`Platform "${platform}" not supported for sharing.`);
        break;
    }
  };

  return (
    <WidgetWrapper m='1rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        timeAgo={timeAgo}
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

      <FlexBetween>
        <FlexBetween gap='1rem'>
          <FlexBetween>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined style={{ color: 'red' }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            {likeCount > 0 && <Typography>{likeCount}</Typography>}
          </FlexBetween>

          <FlexBetween>
            <IconButton onClick={() => setIsComments(!isComments)}>
              {isComments ? <ChatBubble /> : <ChatBubbleOutline />}
            </IconButton>
            {comments.length > 0 && <Typography>{comments.length}</Typography>}
          </FlexBetween>
        </FlexBetween>

        <IconButton onClick={openMenu}>
          {!anchorEl ? <ShareOutlined /> : <Share />}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          keepMounted
        >
          <MenuItem onClick={() => handleShare('Facebook')}>
            <Facebook />
            <Typography ml='0.25rem'>Facebook</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleShare('WhatsApp')}>
            <WhatsApp />
            <Typography ml='0.25rem'>WhatsApp</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleShare('Twitter')}>
            <Twitter />
            <Typography ml='0.25rem'>Twitter</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleShare('Email')}>
            <MailOutline />
            <Typography ml='0.25rem'>Email</Typography>
          </MenuItem>
        </Menu>
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
                <UserImage image={c.userPicture} size='37px' />
                <Box>
                  <Typography color={main} variant='h5' fontWeight='500'>
                    {c.name}
                  </Typography>
                  <Typography color={main}>{c.comment}</Typography>
                </Box>
              </FlexBetween>
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
