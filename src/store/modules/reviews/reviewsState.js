import reviewsActions from './reviewsActions'

export default {
    state: {
        reviews: [],
        reviewsAddition: {
            reviewsCount: 0,
            score: 0,
        },
        reviewsIsLoaded: false,
    },
    actions: {
        ...reviewsActions,
    },
}
