import { useQuery } from 'react-query'
import axios from 'axios'
import { postsUrl } from './projectData'

export const useGetPosts = () => {
  return useQuery('posts', () => {
    return axios.get(postsUrl)
      .then(res => res.data)
      .catch(err => {
        throw new Error(err)
      })
  }, {
    refetchOnWindowFocus: false,
  })
}