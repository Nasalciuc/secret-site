import { useRef } from 'react'
import useInView from '@/components/common/useInView'
import Airliner from '@/components/MainPage/AirlinerArt'
import { scrollToQuote, usePhone } from './homeShared'

// Betty's closing call to action (the question, one line, the quote and the phone) on the site's
// evening sky: our airliner climbs out of a sunset, contrails behind it, the first stars over the
// copy. The plane glides in when the band comes into view, then cruises (it is simply there for
// reduced motion).
export default function HomeCta() {
    const phone = usePhone()
    const ref = useRef(null)
    const inView = useInView(ref, { threshold: 0.3, once: true })

    return (
        <section className={`hp-cta${inView ? ' is-visible' : ''}`} aria-labelledby="hp-cta-title" ref={ref}>
            <div className="hp-cta__sky" aria-hidden="true">
                <span className="hp-cta__stars" />
                <span className="hp-cta__glow" />
                <span className="hp-cta__sun" />
                <span className="hp-cta__cloud hp-cta__cloud--low" />
                <span className="hp-cta__cloud hp-cta__cloud--lit" />
                <span className="hp-cta__cloud hp-cta__cloud--far" />
                <span className="hp-cta__flight">
                    <span className="hp-cta__craft">
                        <Airliner className="hp-cta__plane" />
                    </span>
                </span>
                <span className="hp-cta__shade" />
            </div>
            <div className="hp-wrap hp-cta__inner">
                <h2 className="hp-h2" id="hp-cta-title">
                    Ready to experience business class for less?
                </h2>
                <p className="hp-cta__sub">Join thousands of smart travelers.</p>
                <div className="hp-actions">
                    <button type="button" className="hp-btn hp-btn--gold hp-btn--lg" onClick={scrollToQuote}>
                        Get my free quote
                    </button>
                    <a className="hp-btn hp-btn--glass hp-btn--lg" href={phone.href}>
                        Call {phone.label}
                    </a>
                </div>
            </div>
        </section>
    )
}
