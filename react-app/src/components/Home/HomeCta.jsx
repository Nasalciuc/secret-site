import { useRef } from 'react'
import useInView from '@/components/common/useInView'
import Airliner from '@/components/MainPage/AirlinerArt'
import { scrollToQuote, usePhone } from './homeShared'

// The closing question on the left, the airliner on the right. The plane glides in when the band
// comes into view. Reduced motion leaves it in place.
export default function HomeCta() {
    const phone = usePhone()
    const ref = useRef(null)
    const inView = useInView(ref, { threshold: 0.3, once: true })

    return (
        <section className={`hp-cta${inView ? ' is-visible' : ''}`} aria-labelledby="hp-cta-title" ref={ref}>
            <div className="hp-cta__flight" aria-hidden="true">
                <span className="hp-cta__craft">
                    <Airliner className="hp-cta__plane" />
                </span>
            </div>
            <div className="hp-wrap hp-cta__inner">
                <h2 className="hp-h2" id="hp-cta-title">
                    Ready to experience business class for less?
                </h2>
                <p className="hp-cta__sub">A consultant writes the itinerary. The quote is free.</p>
                <div className="hp-actions">
                    <button type="button" className="hp-btn hp-btn--gold hp-btn--lg" onClick={scrollToQuote}>
                        Get my free quote
                    </button>
                    <a className="hp-btn hp-btn--line hp-btn--lg" href={phone.href}>
                        Call {phone.label}
                    </a>
                </div>
            </div>
        </section>
    )
}
