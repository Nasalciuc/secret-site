import WorksRoute from '@/components/MainPage/WorksRoute'
import { ArrowIcon, scrollToQuote } from './homeShared'

// Betty's "How it works", on a white band: her four numbered steps in a row and one dark button,
// with the site's soul: the steps are the waypoints of a dotted route, and when the band comes into
// view a plane flies it, lighting every number as it passes (the last one gold). Her copy; the fourth
// step no longer promises instant tickets.
const STEPS = [
    { number: '01', title: 'Request a quote', body: 'Fill out our quick form or call us. Tell us your route, dates and preferences.' },
    { number: '02', title: 'We find the best deal', body: 'Our experts access unpublished consolidator fares and negotiate on your behalf.' },
    { number: '03', title: 'Review & confirm', body: 'Receive your personalized options by email or phone. Choose what suits you best.' },
    { number: '04', title: 'Fly in comfort', body: 'Receive your e-tickets by email and enjoy premium service from departure to arrival.' },
]

export default function HomeSteps() {
    return (
        <section className="hp-section hp-band hp-steps" id="how-it-works" aria-labelledby="hp-steps-title">
            <div className="hp-wrap">
                <div className="hp-head hp-head--center">
                    <h2 className="hp-h2" id="hp-steps-title">
                        How it works
                    </h2>
                </div>
                <WorksRoute steps={STEPS} />
                <div className="hp-steps__action">
                    <button type="button" className="hp-btn hp-btn--ink" onClick={scrollToQuote}>
                        Get your quote
                        <ArrowIcon />
                    </button>
                </div>
            </div>
        </section>
    )
}
