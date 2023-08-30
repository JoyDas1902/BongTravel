import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setSearchedPosts } from 'state';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const searchText = useSelector((state) => state.searchText);
  const searchedPosts = useSelector((state) => state.searchedPosts);

  const getPosts = async () => {
    const response = await fetch('http://localhost:3001/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');
    return posts.filter(
      (item) =>
        regex.test(item.firstName) ||
        regex.test(item.lastName) ||
        regex.test(item.description)
    );
  };

  useEffect(() => {
    if (searchText) {
      const searchPost = filterPosts(searchText);
      dispatch(setSearchedPosts(searchPost));
    }
  }, [searchText]);

  return (
    <>
      {searchText && searchedPosts ? (
        <>
          {Array.isArray(searchedPosts) &&
            searchedPosts?.map(
              ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
                createdAt,
              }) => (
                <PostWidget
                  key={_id}
                  postId={_id}
                  postUserId={userId}
                  name={`${firstName} ${lastName}`}
                  description={description}
                  location={location}
                  picturePath={picturePath}
                  userPicturePath={userPicturePath}
                  likes={likes}
                  comments={comments}
                  createdAt={createdAt}
                />
              )
            )}
        </>
      ) : (
        <>
          {Array.isArray(posts) &&
            posts?.map(
              ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
                createdAt,
              }) => (
                <PostWidget
                  key={_id}
                  postId={_id}
                  postUserId={userId}
                  name={`${firstName} ${lastName}`}
                  description={description}
                  location={location}
                  picturePath={picturePath}
                  userPicturePath={userPicturePath}
                  likes={likes}
                  comments={comments}
                  createdAt={createdAt}
                />
              )
            )}
        </>
      )}
    </>
  );
};

export default PostsWidget;
