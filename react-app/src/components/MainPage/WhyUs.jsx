import { useAppStore } from '@/store/useAppStore'

// Moodboard "Why us" section (mockup #why-us): 5/7 grid, intro left, 2x2 cards right.
const cards = [
    {
        title: 'Dedicated experts',
        body: 'Personal consultants who know the best routes and lowest fares.',
        tint: 'amber',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M12 11.6a4.3 4.3 0 1 0 0-8.6 4.3 4.3 0 0 0 0 8.6Z"
                />
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 13.8c-4.5 0-8.2 2.7-8.2 6.3 0 .5.4.9 1 .9h14.4c.6 0 1-.4 1-.9 0-3.6-3.7-6.3-8.2-6.3Zm0 1.5-1.4 1.2 1 4h.8l1-4L12 15.3Z"
                />
            </svg>
        ),
    },
    {
        title: 'Real fares. Real savings.',
        body: 'Verified consolidators. What you see is what you pay.',
        tint: 'emerald',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2.2a5 5 0 0 0-5 5v2.6h-.3A2.7 2.7 0 0 0 4 12.5v6.1a2.7 2.7 0 0 0 2.7 2.7h10.6a2.7 2.7 0 0 0 2.7-2.7v-6.1a2.7 2.7 0 0 0-2.7-2.7H17V7.2a5 5 0 0 0-5-5Zm2.8 7.6V7.2a2.8 2.8 0 1 0-5.6 0v2.6h5.6Zm-2.8 4a1.6 1.6 0 0 0-.8 3l-.4 2a.7.7 0 0 0 .7.8h1a.7.7 0 0 0 .7-.8l-.4-2a1.6 1.6 0 0 0-.8-3Z"
                />
            </svg>
        ),
    },
    {
        title: '24/7 support',
        body: 'From booking to boarding and beyond.',
        tint: 'blue',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M4.6 13.5v-2.1A7.4 7.4 0 0 1 12 4a7.4 7.4 0 0 1 7.4 7.4v2.1"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                />
                <path
                    fill="currentColor"
                    d="M3.4 13.9c0-.8.7-1.5 1.5-1.5h1.3c.8 0 1.4.6 1.4 1.4v4.5c0 .8-.6 1.4-1.4 1.4h-.3a2.5 2.5 0 0 1-2.5-2.5v-3.3ZM20.6 13.9c0-.8-.7-1.5-1.5-1.5h-1.3c-.8 0-1.4.6-1.4 1.4v4.5c0 .8.6 1.4 1.4 1.4h.3a2.5 2.5 0 0 0 2.5-2.5v-3.3Z"
                />
                <path
                    d="M19.2 19.6a3.8 3.8 0 0 1-3.4 2.1h-1.6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                />
                <circle cx="13.2" cy="21.7" r="1.7" fill="currentColor" />
            </svg>
        ),
    },
    {
        title: 'Flexible & protected',
        body: 'Changeable tickets and price protection.',
        tint: 'purple',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6 2.3c.3-.1.5-.1.8 0l7 2.7c.5.2.8.6.8 1.1v5c0 5-3.3 9.5-7.9 11a1.2 1.2 0 0 1-.6 0c-4.6-1.5-7.9-6-7.9-11v-5c0-.5.3-.9.8-1.1l7-2.7Zm4.3 7.3a1.1 1.1 0 0 0-1.6-1.6l-3.4 3.4-1.2-1.2a1.1 1.1 0 1 0-1.6 1.6l2 2c.4.4 1.1.4 1.6 0l4.2-4.2Z"
                />
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
