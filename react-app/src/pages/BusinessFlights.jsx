import OrderFly from '@/components/HeaderForm/OrderFly/OrderFly'
import TestimonialsCarousel from '@/components/BusinessFlights/TestimonialsCarousel'
import SeoContent from '@/components/BusinessFlights/SeoContent'

export default function BusinessFlights() {
    return (
        <div className="business-flights mb-page">
            <section className="mb-bf-hero">
                <div className="mb-bf-hero-inner">
                    <div className="mb-bf-hero-copy xyz-in" xyz="fade left-50% duration-15 delay-5">
                        <h1 className="mb-serif">
                            Cheap Business Class Flights - <br />
                            <span className="accent">Exclusive Discounted Airline Tickets for 2025</span>
                        </h1>
                        <p className="mb-bf-hero-sub">
                            Book your cheap business class tickets today and enjoy a luxurious business class flight with
                            unbeatable deals and offers! Experience premium comfort on the cheapest business class flights from
                            the USA to top destinations like Europe, Asia, Africa, India and many more! Thanks to
                            BuyBusinessClass&apos;s exclusive partnerships with major airlines, we bring you discounts on
                            business class tickets you won&apos;t find anywhere else!
                        </p>
                    </div>
                    <div className="mb-orderfly-card">
                        <h2 className="mb-orderfly-card-title">Search the Best Business Class Flight Deals Today</h2>
                        <OrderFly />
                    </div>
                </div>
            </section>

            <section className="mb-bf-reviews">
                <h2 className="mb-section-title">
                    Our Travelers Saved Big on Business Class Tickets -<br />
                    Now It&apos;s Your Turn to Enjoy Exclusive Business Class Deals You Deserve
                </h2>
                <TestimonialsCarousel />
            </section>

            <SeoContent />
        </div>
    )
}
