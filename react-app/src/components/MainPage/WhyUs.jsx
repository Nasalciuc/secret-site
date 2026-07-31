import { useAppStore } from '@/store/useAppStore'

// Moodboard "Why us" section (mockup #why-us): 5/7 grid, intro left, 2x2 cards right.
// Icons: Font Awesome Free 6.5.2 (solid) by @fontawesome - https://fontawesome.com
// License: CC BY 4.0 - https://fontawesome.com/license/free
const cards = [
    {
        title: 'Dedicated experts',
        body: 'Personal consultants who know the best routes and lowest fares.',
        tint: 'amber',
        icon: (
            <svg width="22" height="24" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z"
                />
            </svg>
        ),
    },
    {
        title: 'Real fares. Real savings.',
        body: 'Verified consolidators. What you see is what you pay.',
        tint: 'emerald',
        icon: (
            <svg width="22" height="24" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
                />
            </svg>
        ),
    },
    {
        title: '24/7 support',
        body: 'From booking to boarding and beyond.',
        tint: 'blue',
        icon: (
            <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z"
                />
            </svg>
        ),
    },
    {
        title: 'Flexible & protected',
        body: 'Changeable tickets and price protection.',
        tint: 'purple',
        icon: (
            <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z"
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
