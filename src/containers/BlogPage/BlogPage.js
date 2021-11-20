import axios from 'axios';
import { useEffect, useState } from 'react';
import './BlogPage.css';
import { AddPostForm } from './components/AddPostForm';
import { BlogCard } from './components/BlogCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { EditPostForm } from './components/EditPostForm';
import { postsUrl } from '../../shared/projectData';

let source;

export const BlogPage = ({ isAdmin }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogArr, setBlogArr] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const fetchPosts = () => {
    source = axios.CancelToken.source();
    axios
      .get(postsUrl, { cancelToken: source.token })
      .then((response) => {
        setBlogArr(response.data);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPosts();
    return () => {
      if (source) {
        source.cancel('Axios get canceled');
      }
    };
  }, []);

  const likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(`${postsUrl}${blogPost.id}`, temp)
      .then((response) => {
        console.log('Пост изменен => ', response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      setIsPending(true);
      axios
        .delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          console.log('Пост удален => ', response.data);
          fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addNewBlogPost = (blogPost) => {
    setIsPending(true);
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log('Пост создан =>', response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editBlogPost = (updatedBlogPost) => {
    setIsPending(true);
    axios
      .put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        console.log('Пост отредактирован =>', response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddFormShow = () => {
    setShowAddForm(true);
  };

  const handleAddFormHide = () => {
    setShowAddForm(false);
  };

  const handleEditFormShow = () => {
    setShowEditForm(true);
  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  const blogPosts = blogArr.map((item) => {
    return (
      <BlogCard
        key={item.id}
        title={item.title}
        description={item.description}
        liked={item.liked}
        likePost={() => likePost(item)}
        deletePost={() => deletePost(item)}
        handleEditFormShow={handleEditFormShow}
        handleSelectPost={() => handleSelectPost(item)}
        isAdmin={isAdmin}
      />
    );
  });

  if (blogArr.length === 0) return <h1>Загружаю данные...</h1>;

  const postsOpactiy = isPending ? 0.5 : 1;

  return (
    <div className='blogPage'>
      {showAddForm && (
        <AddPostForm
          blogArr={blogArr}
          addNewBlogPost={addNewBlogPost}
          handleAddFormHide={handleAddFormHide}
        />
      )}

      {showEditForm && (
        <EditPostForm
          handleEditFormHide={handleEditFormHide}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}

      <>
        <h1>Блог</h1>

        {isAdmin && (
          <div className='addNewPost'>
            <button className='blackBtn' onClick={handleAddFormShow}>
              Создать новый пост
            </button>
          </div>
        )}

        <div className='posts' style={{ opacity: postsOpactiy }}>
          {blogPosts}
        </div>
        {isPending && <CircularProgress className='preloader' />}
      </>
    </div>
  );
};
