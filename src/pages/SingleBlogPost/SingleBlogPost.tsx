import '../../pages/SingleBlogPost/SingleBlogPost.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { EditPostForm } from '../../components/EditPostForm/EditPostForm';
import {
  useDeletePost,
  useEditPost,
  useGetSinglePost,
  useLikePost,
} from '../../shared/queries';

import type { PostItem } from '../../types';

type SingleBlogPostProps = {
  isAdmin: boolean
}

export const SingleBlogPost = ({ isAdmin }: SingleBlogPostProps) => {
  const { postId } = useParams<{ postId: string }>();

  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  const [showEditForm, setShowEditForm] = useState(false);

  const {
    data: post,
    isLoading,
    isError,
    error,
    isFetching
  } = useGetSinglePost(postId);

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();

  if (isLoading) return <h1>Загружаю данные...</h1>;

  if (isError) return <h1>{error.message}</h1>;

  const likePost = (blogPost: PostItem) => {
    const updatedPost = {...blogPost};
    updatedPost.liked = !updatedPost.liked;
    likeMutation.mutate(updatedPost)
  };

  const deletePost = (blogPost: PostItem) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      deleteMutation.mutate(blogPost)
    }
  };

  const editBlogPost = (updatedBlogPost: PostItem) => {
    editMutation.mutate(updatedBlogPost)
  };

  const handleEditFormShow = (blogPost: PostItem) => {
    setShowEditForm(true);
    setSelectedPost(blogPost);
  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  if (post === undefined) return <h1>Загружаю данные...</h1>;

  const postsOpactiy = isFetching ? 0.5 : 1;
  const heartFill = post.liked ? 'crimson' : 'black';

  return (
    <>
      <div className='post' style={{ opacity: postsOpactiy }}>
        {showEditForm && selectedPost !== null && (
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
            <button onClick={() => likePost(post)}>
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
            <button className='deleteBtn' onClick={() => deletePost(post)}>
              <DeleteForeverIcon />
            </button>
          </div>
        )}
      </div>
      {isFetching && <CircularProgress className='preloader' />}
    </>
  );
};
