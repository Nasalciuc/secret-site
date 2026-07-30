/* eslint-disable no-unused-vars */
export const telInputControl = (validation, context) => {
    if (validation.valid) {
        context.valid = true
        context.maxlength = context.phone.length
        return
    }

    context.valid = false
}

export const returnImgUrl = (url) => `${process.env.VUE_APP_BACK}/storage/${url}`

export const fromFullToShort = (type) => {
    switch (type) {
        case 'First Class':
            return 'first'
        case 'Business Class':
            return 'business'
        default:
            return 'premium economy'
    }
}

export const fromShortToFull = (type) => {
    switch (type) {
        case 'first':
            return 'First Class'
        case 'business':
            return 'Business Class'
        default:
            return 'Premium Economy'
    }
}
