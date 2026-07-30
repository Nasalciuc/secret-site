import { createStore } from 'vuex'
import regionsState from './modules/regions/regionsState'
import reviewsState from './modules/reviews/reviewsState'
import blogState from './modules/blog/blogState'
import appState from './modules/app/appState'
import dynamicState from './modules/dynamic/state'

const store = createStore({
    modules: {
        reviews: reviewsState,
        region: regionsState,
        app: appState,
        blog: blogState,
        dynamic: dynamicState,
    },
})

export default store
