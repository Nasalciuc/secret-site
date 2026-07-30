import appMutations from './mutations'

export default {
    state: {
        meta: {
            title: '',
            description: '',
            keywords: [],
        },
        mainTitle: '',
        about: {
            title: '',
            body: '',
        },
    },
    mutations: {
        ...appMutations,
    },
}
