import SecondBlock from '@/components/HeaderForm/FlightCard/SecondBlock'

export default function StudentFlightsPage() {
    return (
        <div className="student-flights-page mb-page mb-promo">
            <div className="container-airline">
                <div className="content-wrapper">
                    <div className="airline-details">
                        <div className="promo-container">
                            <h2 className="promo-title mb-serif">
                                Business Class Flights <br />
                                <span>for Students</span>
                            </h2>
                            <p className="promo-description">
                                Book today and save up to <strong>50 - 77%*</strong> OFF - specially curated business
                                class offers for students looking to travel in style and comfort without breaking the
                                bank.
                            </p>
                            <div className="promo-price-box">
                                <div className="promo-price">
                                    <span className="from-text">FROM</span>
                                    <div className="price-amount">
                                        $969<span className="asterisk">*</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SecondBlock />
                </div>
            </div>
        </div>
    )
}
