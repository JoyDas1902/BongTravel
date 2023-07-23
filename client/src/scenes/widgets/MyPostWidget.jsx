import {
  EditOutlined,
  DeleteOutlined,
  MicOutlined,
  Videocam,
  Image,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Dropzone from 'react-dropzone';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isFile, setIsFile] = useState(false);
  const [file, setFile] = useState(null);
  const [post, setPost] = useState('');
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [isDrafted, setIsDrafted] = useState(false);
  const draftPostKey = `userId_${_id}`;

  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  useEffect(() => {
    const draftPostData = localStorage.getItem(draftPostKey);
    if (draftPostData) {
      setPost(JSON.parse(draftPostData).post);
    }
    setIsDrafted(true);
  }, [draftPostKey]);

  useEffect(() => {
    if (isDrafted) {
      const draftData = { post };
      localStorage.setItem(draftPostKey, JSON.stringify(draftData));
    }
  }, [isDrafted, post, draftPostKey]);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('description', post);
    if (file) {
      formData.append('picture', file);
      formData.append('picturePath', file.name);
    }
    const response = await fetch(`http://localhost:3001/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    localStorage.removeItem(draftPostKey);
    setIsFile(null);
    setFile(null);
    setPost('');
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap='1rem'>
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>
      {isFile && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius='5px'
          mt='1rem'
          p='1rem'
        >
          <Dropzone
            acceptedFiles='.jpg,.jpeg,.png'
            multiple={false}
            onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  borderRadius='5px'
                  p='0 1rem'
                  width='100%'
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!file ? (
                    <p>Add file here...</p>
                  ) : (
                    <FlexBetween>
                      <Typography m='1rem 0'>{file.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {file && (
                  <IconButton
                    onClick={() => setFile(null)}
                    sx={{ marginInline: '0.5rem' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1rem 0' }} />

      <FlexBetween>
        <FlexBetween gap='0.25rem' onClick={() => setIsFile(!isFile)}>
          <Image sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Photo
          </Typography>
        </FlexBetween>

        <FlexBetween gap='0.25rem' onClick={() => setIsFile(!isFile)}>
          <Videocam sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Video
          </Typography>
        </FlexBetween>

        <FlexBetween gap='0.25rem' onClick={() => setIsFile(!isFile)}>
          <MicOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Audio
          </Typography>
        </FlexBetween>

        <Button
          disabled={!post}
          onClick={handlePost}
          style={{
            color: 'white',
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
