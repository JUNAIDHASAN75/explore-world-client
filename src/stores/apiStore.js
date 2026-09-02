import { defineStore } from 'pinia'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useApiStore = defineStore('api', {
  state: () => ({
    token: null,
    loading: false,
    error: null
  }),
  actions: {
    setToken(token) {
      this.token = token
      if (token) apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
      else delete apiClient.defaults.headers.common['Authorization']
    },

    async request(method, url, data = null, config = {}) {
      this.loading = true
      this.error = null
      try {
        const res = await apiClient.request({ method, url, data, ...config })
        return res.data
      } catch (err) {
        this.error = err
        // normalize error
        if (err.response && err.response.data) {
          throw err.response.data
        }
        throw err
      } finally {
        this.loading = false
      }
    },

    get(url, config = {}) {
      return this.request('get', url, null, config)
    },

    post(url, data, config = {}) {
      return this.request('post', url, data, config)
    },

    put(url, data, config = {}) {
      return this.request('put', url, data, config)
    },

    delete(url, config = {}) {
      return this.request('delete', url, null, config)
    }
  }
})

export default useApiStore
