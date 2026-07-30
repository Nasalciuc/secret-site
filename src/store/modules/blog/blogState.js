import blogActions from './blogActions'

export default {
    state: {
        blogs: [],
        blogsIsLoaded: false,
    },
    actions: {
        ...blogActions,
    },
}
