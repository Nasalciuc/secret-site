import { useAppStore } from '@/store/useAppStore'

// Moodboard "Why us" section (mockup #why-us): 5/7 grid, intro left, 2x2 cards right.
const cards = [
    {
        title: 'Dedicated experts',
        body: 'Personal consultants who know the best routes and lowest fares.',
        tint: 'amber',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M4 20C4 16.6863 7.58172 15 12 15C16.4183 15 20 16.6863 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'Real fares. Real savings.',
        body: 'Verified consolidators. What you see is what you pay.',
        tint: 'emerald',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: '24/7 support',
        body: 'From booking to boarding and beyond.',
        tint: 'blue',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 14V12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <rect x="3" y="13" width="4" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
                <rect x="17" y="13" width="4" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M19 19V19.5C19 20.8807 17.8807 22 16.5 22H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'Flexible & protected',
        body: 'Changeable tickets and price protection.',
        tint: 'purple',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 3L19 6V11C19 15.4183 16.0451 19.4025 12 20.5C7.95486 19.4025 5 15.4183 5 11V6L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9 11.5L11 13.5L15 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
]

export default function WhyUs() {
    const { settings } = useAppStore()

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
