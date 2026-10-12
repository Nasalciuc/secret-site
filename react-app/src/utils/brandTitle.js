/** Default document title when no page title is set (Vue App.vue metainfo fallback). */
export const DEFAULT_DOCUMENT_TITLE =
    'Business Class Flight Deals - Save Up To 60% on Air Tickets'

const BRAND = 'BuyBusinessClass'
const BRAND_SUFFIX_RE = /\|\s*BuyBusinessClass\s*$/i
const BRAND_ANY_RE = /BuyBusinessClass/i

/**
 * Appends "| BuyBusinessClass" like Vue App.vue <metainfo>, without double-suffixing.
 * Falsy content → default homepage title (unsuffixed), matching Vue empty-title fallback.
 */
export function withBrandTitle(content, fallback = DEFAULT_DOCUMENT_TITLE) {
    if (!content) return fallback
    const trimmed = String(content).trim()
    if (!trimmed) return fallback
    if (BRAND_SUFFIX_RE.test(trimmed) || BRAND_ANY_RE.test(trimmed)) return trimmed
    return `${trimmed} | ${BRAND}`
}
