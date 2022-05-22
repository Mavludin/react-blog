import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { POSTS_URL } from './constants';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const useGetPosts = () => {
  return useQuery('posts', () => {
    return axios.get(POSTS_URL)
      .then(res => res.data)
      .catch(err => {
        throw new Error(err)
      })
  })
}

export const useGetSinglePost = (postId) => {
  return useQuery(['post', postId], () => {
    return axios.get(POSTS_URL + postId)
      .then(res => res.data)
      .catch(err => {
        throw new Error(err)
      })
  })
}

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedPost) => {
      return axios.put(`${POSTS_URL}${updatedPost.id}`, updatedPost)
        .then(res => res.data)
        .catch(err => {
          throw new Error(err)
        })
    }, {
      onSuccess: (updatedPost) => {
        queryClient.invalidateQueries('posts');
        queryClient.setQueryData(['post', updatedPost.id], updatedPost)
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
}

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const location = useLocation();
  return useMutation(
    (blogPost) => {
      return axios.delete(`${POSTS_URL}${blogPost.id}`)
        .then(res => res.data)
        .catch(err => {
          throw new Error(err)
        })
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        if (location !== '/blog') {
          history.push('/blog');
        }
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
}

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedPost) => {
      return axios.put(`${POSTS_URL}${updatedPost.id}`, updatedPost)
        .then(res => res.data)
        .catch(err => {
          throw new Error(err)
        })
    }, {
      onSuccess: (updatedPost) => {
        queryClient.invalidateQueries('posts');
        queryClient.setQueryData(['post', updatedPost.id], updatedPost)
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
}

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (newBlogPost) => {
      return axios.post(POSTS_URL, newBlogPost)
        .then(res => res.data)
        .catch(err => {
          throw new Error(err)
        })
    }, {
      onSuccess: (data) => {
        console.log('success', data);
        queryClient.invalidateQueries('posts');
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
}
