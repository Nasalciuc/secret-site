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
            <div className="choose-description xyz-in" xyz="fade left-50% duration-15 delay-5">
                <div className="title">
                    <h2 className="main-title" style={{ color: '#dadde0', fontFamily: 'SSP-bold' }}>
                        Why Choose Buy Business Class?
                    </h2>
                </div>
            </div>
            <div className="card xyz-in" xyz="fade left-50% duration-15 delay-5">
                <div className="card-left">
                    <img
                        src={secondImg}
                        alt="Descrierea imaginii"
                        className="card-image"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="card-right">
                    <p className="card-text">
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
            <div className="services-section xyz-in" xyz="fade left-50% duration-15 delay-25">
                <h2 className="section-title">Our Services Include</h2>
                <div className="services-list">
                    {services.map((service) => (
                        <div className="service-item" key={service.number}>
                            <h3 className="service-number">{service.number}</h3>
                            <div className="divider-container">
                                <div className="divider" />
                                <div className="circle" />
                                <div className="divider" />
                            </div>
                            <h4 className="service-title">{service.title}</h4>
                            <p className="service-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ paddingBottom: '5%', paddingTop: '5%' }}>
                <ReviewsSection />
            </div>
        </div>
    )
}
