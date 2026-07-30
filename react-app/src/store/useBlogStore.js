import { create } from 'zustand'
import axios from 'axios'

const BACK = import.meta.env.VITE_BACK

export const useBlogStore = create((set) => ({
    blogs: [],
    blogsIsLoaded: false,
    blog: null,

    setBlogs: (blogs) => set({ blogs, blogsIsLoaded: true }),
    setBlog: (blog) => set({ blog }),

    getBlogs: async () => {
        try {
            const result = await axios.get(`${BACK}/api/articles/getAll`)
            if (result.data.responseCode.responseCode !== '1') {
                throw new Error('')
            }
            set({ blogs: result.data.data, blogsIsLoaded: true })
        } catch (error) {
            set({ blogsIsLoaded: true })
        }
    },

    getBlogById: async (id) => {
        try {
            const result = await axios.get(`${BACK}/api/articles/getOne`, {
                params: { id },
            })
            if (result.data.responseCode.responseCode !== '1') {
                throw new Error('')
            }
            set({ blog: result.data.data })
            return result.data.data
        } catch (error) {
            return null
        }
    },
}))
