import { Link } from 'react-router-dom'
import TeamBlock from './TeamBlock'
import TeamHeader from './TeamHeader'

export default function BottomBlock() {
    return (
        <div className="mb-about-bottom">
            <TeamHeader />
            <TeamBlock />
            <section className="mb-about-closing">
                <div className="mb-about-closing__block">
                    <h2 className="mb-serif mb-about-closing__title">
                        Our <span className="accent">Promise</span>
                    </h2>
                    <p className="mb-about-closing__text">
                        We promise to deliver <b>fast, reliable customer service,</b> the{' '}
                        <b>most competitive pricing,</b> and a <b>hassle-free booking experience.</b> We go the extra mile
                        to make sure your journey begins the moment you book with us and extends all the way until you reach
                        your final destination.
                    </p>
                </div>
                <div className="mb-about-closing__block">
                    <h2 className="mb-serif mb-about-closing__title">
                        Join Thousands of <span className="accent">Happy Clients</span>
                    </h2>
                    <p className="mb-about-closing__text">
                        Ready to experience the best in Business Class travel? Contact us today to get a personalized quote
                        and start your next journey with the comfort and luxury you deserve.
                    </p>
                    <p className="mb-about-closing__cta">
                        <Link to="/">
                            <b>Find Your Perfect Business Class Flight</b>
                        </Link>
                    </p>
                </div>
                <div className="mb-about-closing__block">
                    <h2 className="mb-serif mb-about-closing__title">
                        Trust and <span className="accent">Recognition</span>
                    </h2>
                    <p className="mb-about-closing__text">
                        We take pride in the trust our clients place in us. Over the years, Buy Business Class has garnered
                        recognition for its commitment to premium air travel services. Our client satisfaction rates and
                        positive testimonials speak for themselves, showcasing our dedication to ensuring you receive the
                        best experience possible.
                    </p>
                </div>
            </section>
        </div>
    )
}
