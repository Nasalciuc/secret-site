import { scrollToQuote, usePhone, useTrustpilot } from './homeShared'
import cabinPhoto from '@/assets/images/static/about-image.webp'
import expertOne from '@/assets/images/static/expert-marcel.webp'
import expertTwo from '@/assets/images/static/expert-jessica.webp'
import expertThree from '@/assets/images/static/expert-theodor.webp'
import expertFour from '@/assets/images/static/expert-roberta.webp'

// "Why us", as it was in kit9 (restored on request): the case on the left with the faces of the
// travel managers, and the cabin seen through an aircraft window with the two real claims floating on
// it (up to 60% off published fares, the live Trustpilot score); under them the four reasons as
// numbered cards in one row. Icons: one line set (1.6 stroke, currentColor). Styles:
// mb-homepage-why.scss.
const EXPERTS = [expertOne, expertTwo, expertThree, expertFour]

const svg = (children) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        {children}
    </svg>
)

const REASONS = [
    {
        title: 'Dedicated experts',
        body: 'Personal consultants who know the best routes and lowest fares.',
        icon: svg(
            <>
                <path d="M4 18h16" />
                <path d="M5.5 18a6.5 6.5 0 0 1 13 0" />
                <path d="M12 11.5V9.5" />
                <path d="M10.5 9.5h3" />
            </>,
        ),
    },
    {
        title: 'Real fares. Real savings.',
        body: 'Verified consolidators. What you see is what you pay.',
        icon: svg(
            <>
                <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
                <circle cx="7.5" cy="7.5" r="1.5" />
            </>,
        ),
    },
    {
        title: '24/7 support',
        body: 'From booking to boarding and beyond.',
        icon: svg(
            <>
                <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
                <rect x="3" y="14" width="4" height="6" rx="1.5" />
                <rect x="17" y="14" width="4" height="6" rx="1.5" />
            </>,
        ),
    },
    {
        title: 'Flexible & protected',
        body: 'Changeable tickets and price protection.',
        icon: svg(
            <>
                <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
                <path d="m8.8 12 2.2 2.2 4.2-4.4" />
            </>,
        ),
    },
]

const TagIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
)

const StarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M12 2l2.95 6.35 6.98.84-5.16 4.78 1.37 6.87L12 17.42l-6.14 3.42 1.37-6.87-5.16-4.78 6.98-.84L12 2z" />
    </svg>
)

export default function HomeWhy() {
    const phone = usePhone()
    const { score } = useTrustpilot()

    return (
        <section className="mb-why" id="why-us" aria-labelledby="hp-why-title">
            <div className="hp-wrap">
                <div className="mb-why__inner">
                    <div className="mb-why__intro">
                        <h2 className="mb-why__title mb-serif" id="hp-why-title">
                            Premium travel,{' '}
                            <br />
                            without the premium price.
                        </h2>
                        <p className="mb-why__text">
                            We specialize exclusively in business and first class. Dedicated experts. The best unpublished fares.
                        </p>
                        <div className="mb-why__actions">
                            <button type="button" className="mb-btn-gold" onClick={scrollToQuote}>
                                Get your quote
                            </button>
                            <a className="mb-btn-outline" href={phone.href}>
                                Call 24/7
                            </a>
                        </div>
                        <div className="mb-why__experts">
                            <span className="mb-why__faces" aria-hidden="true">
                                {EXPERTS.map((src) => (
                                    <img key={src} src={src} alt="" width="48" height="48" loading="lazy" decoding="async" />
                                ))}
                            </span>
                            <span className="mb-why__experts-text">
                                <strong>Human experts, not a faceless engine</strong>
                                <span>
                                    <span className="mb-why__online" aria-hidden="true" />
                                    Personal travel managers on call 24/7
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="mb-why__visual">
                        <div className="mb-why__window">
                            <img src={cabinPhoto} alt="A private cabin suite, seen through an aircraft window" loading="lazy" decoding="async" />
                        </div>
                        <div className="mb-why__chip mb-why__chip--tl">
                            <span className="mb-why__chip-icon">
                                <TagIcon />
                            </span>
                            <span className="mb-why__chip-text">
                                <strong>Up to 60% off</strong>
                                <small>published fares</small>
                            </span>
                        </div>
                        {score > 0 && (
                            <div className="mb-why__chip mb-why__chip--br">
                                <span className="mb-why__chip-icon">
                                    <StarIcon />
                                </span>
                                <span className="mb-why__chip-text">
                                    <strong>{score.toFixed(1)}/5</strong>
                                    <small>on Trustpilot</small>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <ul className="mb-why__cards">
                    {REASONS.map((reason, index) => (
                        <li className="mb-why__card" key={reason.title}>
                            <div className="mb-why__card-head">
                                <span className="mb-why__icon">{reason.icon}</span>
                                <span className="mb-why__num" aria-hidden="true">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <h3 className="mb-why__card-title">{reason.title}</h3>
                            <p className="mb-why__card-body">{reason.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
