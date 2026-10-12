import React from 'react'

// Gold check icon for the "Why Travelers Choose" checklist (moodboard restyle).
// Presentation only — the SEO copy below is verbatim from the live site.
function CheckIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="10" cy="10" r="10" fill="#b4853b" fillOpacity="0.14" />
            <path d="M5.8 10.4l2.7 2.7 5.7-6.2" stroke="#b4853b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function SeoContent() {
    return (
        <section className="seo-content home-seo">
            <div className="seo-inner">
                <h2>
                    Book Business Class Airline Tickets at <span className="accent">Exclusive Discounts</span>
                </h2>
                <p>
                    At BuyBusinessClass, we make premium travel effortless and affordable. Whether you're flying for work or
                    leisure, our team sources <strong>Business Class Airline Tickets</strong> to destinations across Europe,
                    Asia, the Middle East, Africa and the Americas at prices the general public rarely sees. Our direct
                    relationships with major carriers allow us to offer <strong>Cheap Business Class Air Tickets</strong>{' '}
                    that combine full lie-flat comfort with real savings of up to 60% off published fares.
                </p>
                <p>
                    Looking for last-minute <strong>Business Class Flight Tickets</strong> to New York, London, Dubai, Tokyo
                    or Sydney? We've got you covered. Every <strong>Discount Business Class Ticket</strong> we book comes
                    with full airline inventory access, flexible routing options and human agents who negotiate your
                    itinerary — not a faceless engine. That's how we consistently deliver a genuinely{' '}
                    <strong>Cheap Business Class Fare</strong> without cutting corners on service or seat selection.
                </p>

                <h3>Why Travelers Choose Our Business Class Tickets</h3>
                <ul className="seo-list seo-checklist">
                    <li>
                        <CheckIcon />
                        <strong>Up to 60% off Business Class Tickets</strong> — transparent savings backed by live quotes,
                        not bait-and-switch fares.
                    </li>
                    <li>
                        <CheckIcon />
                        <strong>Exclusive Deals On Business Class Flights</strong> on more than 30 premium airlines,
                        including Emirates, Qatar Airways, Singapore Airlines, Lufthansa, British Airways and ANA.
                    </li>
                    <li>
                        <CheckIcon />
                        <strong>Business Class Plane Tickets</strong> that include lie-flat seats, priority boarding, lounge
                        access, premium dining and generous baggage allowance.
                    </li>
                    <li>
                        <CheckIcon />
                        Hand-picked <strong>Flight Deals Business Class</strong> for one-way, round-trip and open-jaw
                        itineraries — including multi-city and long-haul routes.
                    </li>
                    <li>
                        <CheckIcon />
                        Dedicated concierge support from booking to boarding, seven days a week.
                    </li>
                </ul>

                <h3>How We Find Discounted Business Class Fares</h3>
                <p>
                    Our agents leverage a combination of contracted airline rates, mileage award availability, and
                    specialized fare sources to identify business class options that are not typically visible on standard
                    booking platforms. By combining industry expertise with flexible routing strategies, they can explore
                    alternative connections, optimize itineraries across multiple carriers, and secure availability while
                    you finalize your plans. This approach consistently uncovers competitively priced business class
                    fares—often comparable to premium economy offerings found elsewhere.
                </p>
                <p>
                    If your dates are flexible, even better. Shift your departure by a day or two and we'll almost always
                    find you a <strong>Cheap Business Class Airfare</strong> that fits both your itinerary and your budget.
                    Travelling with family or a small group? Ask us about multi-passenger discounts — the more seats you
                    book, the deeper your savings on each <strong>Business Class Air Ticket</strong>.
                </p>

                <h3>Popular Routes for Cheap Business Class Flights</h3>
                <p>
                    We book thousands of premium itineraries every month. Some of the most requested routes where we
                    consistently deliver a <strong>Cheap Business Class Air Ticket</strong> include:
                </p>
                <ul className="seo-list">
                    <li>New York (JFK / EWR) ⇄ London, Paris, Rome, Frankfurt, Zurich</li>
                    <li>Los Angeles (LAX) ⇄ Tokyo, Seoul, Hong Kong, Sydney, Auckland</li>
                    <li>Miami (MIA) ⇄ Madrid, Lisbon, São Paulo, Buenos Aires</li>
                    <li>San Francisco (SFO) ⇄ Singapore, Bangkok, Dubai, Delhi, Mumbai</li>
                    <li>Chicago (ORD) ⇄ Istanbul, Doha, Johannesburg, Cape Town</li>
                </ul>

                <h3>Ready for Your Next Business Class Flight?</h3>
                <p>
                    Tell us where you want to go and when — our team will return a fully-priced quote for your preferred{' '}
                    <strong>Business Class Flight Tickets</strong> within minutes, not days. Expect real fares, real
                    availability and real savings. With BuyBusinessClass in your corner, premium travel stops being a luxury
                    and starts being a habit.
                </p>
            </div>
        </section>
    )
}
