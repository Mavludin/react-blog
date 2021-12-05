import './BlogCard.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { postsUrl } from '../../../shared/projectData';
import { EditPostForm } from './EditPostForm';

export const BlogCardPage = ({ isAdmin }) => {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  const [isPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const [showEditForm, setShowEditForm] = useState(false);

  const history = useHistory();

  const fetchPost = (id) => {
    axios
      .get(postsUrl + id)
      .then((response) => {
        setPost(response.data);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  const likePost = () => {
    const temp = { ...post };
    temp.liked = !temp.liked;

    axios
      .put(`${postsUrl}${postId}`, temp)
      .then((response) => {
        console.log('Пост изменен => ', response.data);
        fetchPost(postId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = () => {
    if (window.confirm(`Удалить ${post.title}?`)) {
      setIsPending(true);
      axios
        .delete(`${postsUrl}${postId}`)
        .then((response) => {
          console.log('Пост удален => ', response.data);
          setIsPending(false);
          history.push('/blog');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editBlogPost = (updatedBlogPost) => {
    setIsPending(true);
    axios
      .put(`${postsUrl}${postId}`, updatedBlogPost)
      .then((response) => {
        console.log('Пост отредактирован =>', response.data);
        fetchPost(postId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditFormShow = (blogPost) => {
    setShowEditForm(true);
    setSelectedPost(blogPost);
  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  if (!post.title) return <h1>Загружаю данные...</h1>;

  const postsOpactiy = isPending ? 0.5 : 1;
  const heartFill = post.liked ? 'crimson' : 'black';

  return (
    <>
      <div className='post' style={{ opacity: postsOpactiy }}>
        {showEditForm && (
          <EditPostForm
            handleEditFormHide={handleEditFormHide}
            selectedPost={selectedPost}
            editBlogPost={editBlogPost}
          />
        )}
        <div className='postContent'>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div>
            <button onClick={likePost}>
              <FavoriteIcon style={{ fill: heartFill }} />
            </button>
          </div>
        </div>
        {isAdmin && (
          <div className='postControl'>
            <button
              className='editBtn'
              onClick={() => handleEditFormShow(post)}
            >
              <EditIcon />
            </button>
            <button className='deleteBtn' onClick={deletePost}>
              <DeleteForeverIcon />
            </button>
          </div>
        )}
      </div>
      {isPending && <CircularProgress className='preloader' />}
    </>
  );
};
