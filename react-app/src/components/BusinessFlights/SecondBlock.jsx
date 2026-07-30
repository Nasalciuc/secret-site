import TestimonialsCarousel from './TestimonialsCarousel'

export default function SecondBlock() {
    return (
        <div className="xyz-in" xyz="fade left-50% duration-15 delay-5">
            <div className="business-flight-second-description">
                <div className="title">
                    <h2 className="main-title" style={{ fontFamily: 'SSP-bold', fontSize: 30 }}>
                        Our Travelers Saved Big on Business Class Tickets -<br />
                        Now It&apos;s Your Turn to Enjoy Exclusive Business Class Deals You Deserve
                    </h2>
                </div>
            </div>
            <div>
                <TestimonialsCarousel />
            </div>
        </div>
    )
}
