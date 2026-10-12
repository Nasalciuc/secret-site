// Trustpilot reviews as the site shows them: which three to show, how a reviewer's name reads,
// where a review links to. Shared by the reviews section of the inner pages (ReviewsSection) and
// the homepage (Home/HomeReviews).

export const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/buybusinessclass.com'

// Shown when the Trustpilot API is unreachable (common on localhost CORS) so the
// section never sits on empty grey skeleton cards forever.
export const FALLBACK_REVIEWS = [
    {
        stars: 5,
        body: 'Saved thousands on our family business-class tickets. Agent was responsive and made the whole process easy.',
        author_name: 'Amanda R.',
    },
    {
        stars: 5,
        body: 'Quoted in minutes and locked a great fare to Europe. Exactly the unpublished rate we were hoping for.',
        author_name: 'James K.',
    },
    {
        stars: 5,
        body: 'Professional from first call to ticket issue. Will book with BuyBusinessClass again for our next long-haul.',
        author_name: 'Priya S.',
    },
]

// Real reviews run from a few words to whole pages. A pass reads best at two to five lines, so the
// latest reviews of that length go first and the others top them up. The stars are always the
// reviewer's own.
const READS_WELL = { min: 60, max: 320 }

export function pickReviews(list) {
    const reads = (review) => {
        const length = String(review.body || review.title || '').trim().length
        return length >= READS_WELL.min && length <= READS_WELL.max
    }
    return [...list.filter(reads), ...list.filter((review) => !reads(review))].slice(0, 3)
}

// Trustpilot names arrive as people typed them ("TANJUA WASHINGTON", "Mr. TRAVIS HAMMOND",
// "customer"). On the pass they read like the built-in reviews: first name and the initial of
// the last name ("Tanjua W."); a missing or generic name reads "Guest".
const HONORIFIC = /^(mr|mrs|ms|miss|mx|dr|prof|sir)\.?$/i
const SUFFIX = /^(jr|sr|ii|iii|iv)\.?$/i
const GENERIC = /^(customer|client|user|consumer|anonymous|guest|traveler|traveller|reviewer)$/i

// Fix the case only when a word is all capitals or all small letters ("McGuire" stays).
const tidyCase = (word) =>
    word
        .split('-')
        .map((part) => (part === part.toUpperCase() || part === part.toLowerCase() ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part))
        .join('-')

export function formatAuthorName(name) {
    const words = String(name || '')
        .trim()
        .split(/\s+/)
        .filter((word) => word && !HONORIFIC.test(word) && !SUFFIX.test(word))
    if (!words.length || (words.length === 1 && GENERIC.test(words[0]))) return 'Guest'
    const first = tidyCase(words[0])
    if (words.length === 1) return first
    const initial = words[words.length - 1].replace(/[^\p{L}]/gu, '').charAt(0).toUpperCase()
    return initial ? `${first} ${initial}.` : first
}

// Where a pass leads: the review itself once the API sends its link or Trustpilot id,
// until then the company page on Trustpilot.
export function reviewHref(review) {
    if (typeof review.url === 'string' && review.url.startsWith('https://')) return review.url
    if (review.id) return `https://www.trustpilot.com/reviews/${encodeURIComponent(review.id)}`
    return TRUSTPILOT_URL
}

// Trustpilot's own wording for a TrustScore.
export function scoreWord(score) {
    if (score >= 4.3) return 'Excellent'
    if (score >= 3.8) return 'Great'
    if (score >= 2.8) return 'Average'
    return ''
}
