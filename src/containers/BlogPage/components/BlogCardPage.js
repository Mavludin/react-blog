import './BlogCard.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { postsUrl } from '../../../shared/projectData';

export const BlogCardPage = ({
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
  isAdmin,
}) => {
  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  };

  const { postId } = useParams();
  const [ post, setPost ] = useState({});

  useEffect(() => {
    axios
    .get(postsUrl + postId)
    .then((response) => {
      setPost(response.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [postId, setPost])

  const heartFill = post.liked ? 'crimson' : 'black';

  return (
    <div className='post'>
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
          <button className='editBtn' onClick={showEditForm}>
            <EditIcon />
          </button>
          <button className='deleteBtn' onClick={deletePost}>
            <DeleteForeverIcon />
          </button>
        </div>
      )}
    </div>
  );
};
