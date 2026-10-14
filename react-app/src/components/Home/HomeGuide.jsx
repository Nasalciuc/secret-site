import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faqs } from '@/components/MainPage/FaqSection'
import agentImg from '@/assets/images/static/concierge-agent.webp'
import { ArrowIcon, usePhone } from './homeShared'

// The site's reading matter, in Betty's language on a white band: the first six questions of the
// FAQ as an accordion (every answer stays in the page), with a travel manager beside them, and the
// long SEO guide, its copy verbatim from the live site, shown in part until "Read the full guide"
// opens it (all of it is in the page).
const POPULAR_ROUTES = [
    ['New York (JFK / EWR)', 'London, Paris, Rome, Frankfurt, Zurich'],
    ['Los Angeles (LAX)', 'Tokyo, Seoul, Hong Kong, Sydney, Auckland'],
    ['Miami (MIA)', 'Madrid, Lisbon, São Paulo, Buenos Aires'],
    ['San Francisco (SFO)', 'Singapore, Bangkok, Dubai, Delhi, Mumbai'],
    ['Chicago (ORD)', 'Istanbul, Doha, Johannesburg, Cape Town'],
]

function Faq() {
    const phone = usePhone()
    const [open, setOpen] = useState(0)
    const items = faqs.slice(0, 6)

    return (
        <div className="hp-faq">
            <div className="hp-faq__intro">
                <h2 className="hp-h2" id="hp-guide-title">
                    Frequently asked questions
                </h2>
                <div className="hp-faq__agent">
                    <img src={agentImg} alt="" width="56" height="56" loading="lazy" decoding="async" />
                    <div>
                        <p className="hp-faq__agent-title">Call a travel manager</p>
                        <p className="hp-faq__agent-text">The desk is staffed 24/7.</p>
                    </div>
                </div>
                <div className="hp-actions">
                    <Link to="/faq" className="hp-btn hp-btn--ink">
                        See all questions
                    </Link>
                    <a className="hp-btn hp-btn--line" href={phone.href}>
                        Call {phone.label}
                    </a>
                </div>
            </div>
            <div className="hp-faq__list">
                {items.map((item, index) => {
                    const isOpen = open === index
                    return (
                        <div className={`hp-faq__item${isOpen ? ' is-open' : ''}`} key={item.schemaQuestion}>
                            <h3 className="hp-faq__q">
                                <button
                                    type="button"
                                    id={`hp-faq-q-${index}`}
                                    aria-expanded={isOpen}
                                    aria-controls={`hp-faq-a-${index}`}
                                    onClick={() => setOpen(isOpen ? null : index)}
                                >
                                    <span className="hp-faq__no" aria-hidden="true">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="hp-faq__text">{item.question.replace(/^FAQ\s*\d+:\s*/, '')}</span>
                                    <span className="hp-faq__icon" aria-hidden="true" />
                                </button>
                            </h3>
                            <div
                                className="hp-faq__a"
                                id={`hp-faq-a-${index}`}
                                role="region"
                                aria-labelledby={`hp-faq-q-${index}`}
                                inert={isOpen ? undefined : ''}
                            >
                                <div>
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function Article() {
    const [open, setOpen] = useState(false)

    return (
        <div className={`hp-article${open ? ' is-open' : ''}`}>
            <div className="hp-article__body" id="hp-article-body">
                <h2>Book Business Class Airline Tickets at Exclusive Discounts</h2>
                <p>
                    At BuyBusinessClass, we make premium travel effortless and affordable. Whether you&apos;re flying for work or leisure, our team
                    sources <strong>Business Class Airline Tickets</strong> to destinations across Europe, Asia, the Middle East, Africa and the
                    Americas at prices the general public rarely sees. Our direct relationships with major carriers allow us to offer{' '}
                    <strong>Cheap Business Class Air Tickets</strong> that combine full lie-flat comfort with real savings of up to 60% off published
                    fares.
                </p>
                <p>
                    Looking for last-minute <strong>Business Class Flight Tickets</strong> to New York, London, Dubai, Tokyo or Sydney? We&apos;ve got
                    you covered. Every <strong>Discount Business Class Ticket</strong> we book comes with full airline inventory access, flexible
                    routing options and human agents who negotiate your itinerary — not a faceless engine. That&apos;s how we consistently deliver a
                    genuinely <strong>Cheap Business Class Fare</strong> without cutting corners on service or seat selection.
                </p>

                <h3>Why Travelers Choose Our Business Class Tickets</h3>
                <ul className="hp-article__checks">
                    <li>
                        <strong>Up to 60% off Business Class Tickets</strong> — transparent savings backed by live quotes, not bait-and-switch fares.
                    </li>
                    <li>
                        <strong>Exclusive Deals On Business Class Flights</strong> on more than 30 premium airlines, including Emirates, Qatar Airways,
                        Singapore Airlines, Lufthansa, British Airways and ANA.
                    </li>
                    <li>
                        <strong>Business Class Plane Tickets</strong> that include lie-flat seats, priority boarding, lounge access, premium dining and
                        generous baggage allowance.
                    </li>
                    <li>
                        Hand-picked <strong>Flight Deals Business Class</strong> for one-way, round-trip and open-jaw itineraries — including multi-city
                        and long-haul routes.
                    </li>
                    <li>Dedicated concierge support from booking to boarding, seven days a week.</li>
                </ul>

                <h3>How We Find Discounted Business Class Fares</h3>
                <p>
                    Our agents leverage a combination of contracted airline rates, mileage award availability, and specialized fare sources to identify
                    business class options that are not typically visible on standard booking platforms. By combining industry expertise with flexible
                    routing strategies, they can explore alternative connections, optimize itineraries across multiple carriers, and secure availability
                    while you finalize your plans. This approach consistently uncovers competitively priced business class fares—often comparable to
                    premium economy offerings found elsewhere.
                </p>
                <p>
                    If your dates are flexible, even better. Shift your departure by a day or two and we&apos;ll almost always find you a{' '}
                    <strong>Cheap Business Class Airfare</strong> that fits both your itinerary and your budget. Travelling with family or a small
                    group? Ask us about multi-passenger discounts — the more seats you book, the deeper your savings on each{' '}
                    <strong>Business Class Air Ticket</strong>.
                </p>

                <h3>Popular Routes for Cheap Business Class Flights</h3>
                <p>
                    We book thousands of premium itineraries every month. Some of the most requested routes where we consistently deliver a{' '}
                    <strong>Cheap Business Class Air Ticket</strong> include:
                </p>
                <ul className="hp-article__routes">
                    {POPULAR_ROUTES.map(([from, to]) => (
                        <li key={from}>
                            <span className="hp-article__from">{from}</span> <span aria-hidden="true">⇄</span>{' '}
                            <span className="hp-article__to">{to}</span>
                        </li>
                    ))}
                </ul>

                <h3>Ready for Your Next Business Class Flight?</h3>
                <p>
                    Tell us where you want to go and when — our team will return a fully-priced quote for your preferred{' '}
                    <strong>Business Class Flight Tickets</strong> within minutes, not days. Expect real fares, real availability and real savings.
                    With BuyBusinessClass in your corner, premium travel stops being a luxury and starts being a habit.
                </p>
            </div>
            <button type="button" className="hp-link hp-article__toggle" aria-expanded={open} aria-controls="hp-article-body" onClick={() => setOpen(!open)}>
                {open ? 'Show less' : 'Read the full guide'}
                <ArrowIcon />
            </button>
        </div>
    )
}

export default function HomeGuide() {
    return (
        <section className="hp-section hp-band hp-guide" aria-labelledby="hp-guide-title">
            <div className="hp-wrap">
                <Faq />
                <Article />
            </div>
        </section>
    )
}
