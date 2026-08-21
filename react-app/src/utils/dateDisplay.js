// Display-only date formatting. The app stores and transmits dates as
// dd.mm.yyyy strings (fr-CH locale). This converts them to a US-readable
// label ('Aug 12, 2026') purely for rendering in buttons and labels.
// Never feed the result back into state, payloads, or date conversions.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const formatUsDate = (ddmmyyyy) => {
    if (typeof ddmmyyyy !== 'string') return ddmmyyyy
    const match = ddmmyyyy.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
    if (!match) return ddmmyyyy
    const [, dd, mm, yyyy] = match
    const month = MONTHS[Number(mm) - 1]
    if (!month) return ddmmyyyy
    return `${month} ${Number(dd)}, ${yyyy}`
}
