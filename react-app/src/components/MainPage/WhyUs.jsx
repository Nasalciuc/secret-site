import { useAppStore } from '@/store/useAppStore'
import { useReviewsStore } from '@/store/useReviewsStore'

// Moodboard "Why us" section (mockup #why-us): 5/7 grid, intro left, 2x2 cards right.
// Icons: Fluent Emoji by Microsoft - https://github.com/microsoft/fluentui-emoji
// License: MIT. Color style, shipped as local SVG assets.
import bellhopIcon from '@/assets/icons/fluent/bellhop-bell.svg'
import banknoteIcon from '@/assets/icons/fluent/dollar-banknote.svg'
import headphoneIcon from '@/assets/icons/fluent/headphone.svg'
import shieldIcon from '@/assets/icons/fluent/shield.svg'
import starIcon from '@/assets/icons/fluent/star.svg'
import cabinPhoto from '@/assets/images/static/about-image.webp'

const cards = [
    {
        title: 'Dedicated experts',
        body: 'Personal consultants who know the best routes and lowest fares.',
        tint: 'amber',
        icon: <img src={bellhopIcon} alt="" width="28" height="28" loading="lazy" />,
    },
    {
        title: 'Real fares. Real savings.',
        body: 'Verified consolidators. What you see is what you pay.',
        tint: 'emerald',
        icon: <img src={banknoteIcon} alt="" width="28" height="28" loading="lazy" />,
    },
    {
        title: '24/7 support',
        body: 'From booking to boarding and beyond.',
        tint: 'blue',
        icon: <img src={headphoneIcon} alt="" width="28" height="28" loading="lazy" />,
    },
    {
        title: 'Flexible & protected',
        body: 'Changeable tickets and price protection.',
        tint: 'purple',
        icon: <img src={shieldIcon} alt="" width="28" height="28" loading="lazy" />,
    },
]

export default function WhyUs() {
    const { settings } = useAppStore()
    const score = useReviewsStore((state) => state.score)

    const scrollToOrderFly = () => {
        const el = document.getElementById('order-fly')
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <section className="mb-why" id="why-us">
            <div className="mb-why__inner">
                <div className="mb-why__intro">
                    <span className="mb-eyebrow">The BuyBusinessClass difference</span>
                    <h2 className="mb-why__title mb-serif">
                        Premium travel,
                        <br />
                        without the premium price.
                    </h2>
                    <p className="mb-why__text">
                        We specialize exclusively in business and first class. Dedicated experts. The best
                        unpublished fares.
                    </p>
                    <div className="mb-why__actions">
                        <button type="button" className="mb-btn-gold" onClick={scrollToOrderFly}>
                            Get your quote
                        </button>
                        <a className="mb-btn-outline" href={`tel:${settings?.number || '+18883227999'}`}>
                            Call 24/7
                        </a>
                    </div>
                    <div className="mb-why__photo">
                        <img src={cabinPhoto} alt="Business class cabin suite" loading="lazy" decoding="async" />
                        <div className="mb-why__chip mb-why__chip--tl">
                            <span className="mb-why__chip-icon mb-why__chip-icon--emerald">
                                <img src={banknoteIcon} alt="" width="22" height="22" loading="lazy" />
                            </span>
                            <span className="mb-why__chip-text">
                                <strong>Up to 60% off</strong>
                                <small>published fares</small>
                            </span>
                        </div>
                        {score > 0 && (
                            <div className="mb-why__chip mb-why__chip--br">
                                <span className="mb-why__chip-icon mb-why__chip-icon--amber">
                                    <img src={starIcon} alt="" width="22" height="22" loading="lazy" />
                                </span>
                                <span className="mb-why__chip-text">
                                    <strong>{score}/5</strong>
                                    <small>Trustpilot reviews</small>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-why__cards">
                    {cards.map((card) => (
                        <div className="mb-why__card" key={card.title}>
                            <div className={`mb-why__icon mb-why__icon--${card.tint}`}>{card.icon}</div>
                            <p className="mb-why__card-title">{card.title}</p>
                            <p className="mb-why__card-body">{card.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
