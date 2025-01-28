import './AddPostForm.css';
import CancelIcon from '@material-ui/icons/Cancel';
import { useEffect, useState } from 'react';

import type { PostItem } from '../../../types';

type AddPostFormProps = {
  addNewBlogPost: (value: Omit<PostItem, 'id'>) => void
  handleAddFormHide: () => void
}

export const AddPostForm = ({ addNewBlogPost, handleAddFormHide }: AddPostFormProps) => {
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');

  const handlePostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const handlePostDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDesc(e.target.value);
  };

  const createPost = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: postDesc,
      liked: false,
    };

    addNewBlogPost(post);
    handleAddFormHide();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleAddFormHide();
      }
    };

    window.addEventListener('keyup', handleEscape);

    return () => {
      window.removeEventListener('keyup', handleEscape);
    };
  }, []);

  return (
    <>
      <form className='addPostForm' onSubmit={createPost}>
        <button className='hideBtn' onClick={handleAddFormHide}>
          <CancelIcon />
        </button>
        <h2>Создание поста</h2>
        <div>
          <input
            className='addFormInput'
            type='text'
            name='postTitle'
            placeholder='Заголовок поста'
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            className='addFormInput'
            name='postDescription'
            placeholder='Описание поста'
            value={postDesc}
            onChange={handlePostDescChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button className='blackBtn' type='submit'>
            Добавить пост
          </button>
        </div>
      </form>
      <div onClick={handleAddFormHide} className='overlay'></div>
    </>
  );
};
