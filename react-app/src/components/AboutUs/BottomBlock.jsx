import { Link } from 'react-router-dom'
import TeamBlock from './TeamBlock'
import TeamHeader from './TeamHeader'

export default function BottomBlock() {
    return (
        <div>
            <div className="bottom-description">
                <TeamHeader />
                <TeamBlock />
                <div className="title">
                    <div className="main-title">
                        <h2 className="accent" style={{ fontSize: '43px' }}>
                            Our Promise
                        </h2>
                    </div>
                </div>

                <p className="content" style={{ textAlign: 'center' }}>
                    We promise to deliver <b>fast, reliable customer service,</b> the{' '}
                    <b>most competitive pricing,</b> and a <b>hassle-free booking experience.</b> We go the extra mile
                    to make sure your journey begins the moment you book with us and extends all the way until you reach
                    your final destination.
                </p>
                <div className="title" style={{ paddingTop: '50px' }}>
                    <div className="main-title">
                        <h2 className="accent" style={{ fontSize: '43px' }}>
                            Join Thousands of Happy Clients
                        </h2>
                    </div>
                </div>

                <p className="content" style={{ textAlign: 'center' }}>
                    Ready to experience the best in Business Class travel? Contact us today to get a personalized quote
                    and start your next journey with the comfort and luxury you deserve.
                </p>
                <p className="content" style={{ textAlign: 'center', textDecoration: 'underline', cursor: 'pointer' }}>
                    <Link to="/">
                        <b>Find Your Perfect Business Class Flight</b>
                    </Link>
                </p>
                <div className="title" style={{ paddingTop: '50px' }}>
                    <div className="main-title">
                        <h2 className="accent" style={{ fontSize: '43px', color: '#fff' }}>
                            Trust and Recognition
                        </h2>
                    </div>
                </div>

                <p className="content" style={{ textAlign: 'center' }}>
                    We take pride in the trust our clients place in us. Over the years, Buy Business Class has garnered
                    recognition for its commitment to premium air travel services. Our client satisfaction rates and
                    positive testimonials speak for themselves, showcasing our dedication to ensuring you receive the
                    best experience possible.
                </p>
            </div>
        </div>
    )
}
