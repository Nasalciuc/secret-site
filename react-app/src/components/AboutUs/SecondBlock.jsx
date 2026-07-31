import ReviewsSection from '@/components/MainPage/ReviewsSection'
import secondImg from '@/assets/images/static/second.jpg'

const services = [
    {
        number: '01.',
        title: 'Exclusive Business and First Class Deals',
        description:
            'Save up to 60% on Business Class flights through our airline agreements, providing cheap business class tickets',
    },
    {
        number: '02.',
        title: 'Custom Itineraries',
        description: "Tailor-made flight routes, whether it's for multi-stop business trips or complex international journeys.",
    },
    {
        number: '03.',
        title: 'Upgrades & Priority Access',
        description: 'Enjoy complimentary upgrades and priority booking on overbooked flights.',
    },
    {
        number: '04.',
        title: '24/7 Personalized Service',
        description:
            'Our travel consultants are available round-the-clock to provide assistance, ensuring a seamless and worry-free experience.',
    },
    {
        number: '05.',
        title: 'Complex Route Expertise',
        description:
            "Whether it's a simple business trip or a complex itinerary, we specialize in getting you where you need to go with efficiency.",
    },
]

export default function SecondBlock() {
    return (
        <div>
            <section className="mb-about-why xyz-in" xyz="fade duration-15 delay-5">
                <span className="mb-eyebrow">Why choose us</span>
                <h2 className="mb-serif mb-about-why__title">
                    Why Choose <span className="accent">Buy Business Class?</span>
                </h2>
                <div className="mb-about-story">
                    <div className="mb-about-story__media">
                        <img
                            src={secondImg}
                            alt="Descrierea imaginii"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <div className="mb-about-story__body">
                        <p>
                            With over 7 years of expertise in the industry, our passionate team of travel specialists have
                            helped countless clients secure luxury business class experiences and affordable business and
                            first-class tickets to European destinations and beyond. <br />
                            <br />
                            We offer exclusive business class offers and discount business class fares, ensuring you receive
                            the best possible value for your premium air travel. Our partnerships with all major airlines
                            allow us to offer competitive fares you won't find elsewhere.
                        </p>
                    </div>
                </div>
            </section>
            <section className="mb-about-services xyz-in" xyz="fade duration-15 delay-25">
                <div className="mb-about-services__inner">
                    <span className="mb-eyebrow">What we do</span>
                    <h2 className="mb-about-services__title">Our Services Include</h2>
                    <div className="mb-about-services__grid">
                        {services.map((service) => (
                            <div className="mb-about-services__item" key={service.number}>
                                <p className="mb-serif mb-about-services__num">{service.number}</p>
                                <h3 className="mb-about-services__item-title">{service.title}</h3>
                                <p className="mb-about-services__item-body">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <ReviewsSection />
        </div>
    )
}
