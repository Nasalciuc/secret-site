import regionsActions from './regionsActions'

export default {
    state: {
        regions: {
            cities: [],
            countries: [],
            regions: [],
        },
        bestSelling: [],
        bestSellingIsLoaded: false,
        regionsIsLoaded: false,
    },
    actions: {
        ...regionsActions,
    },
}
