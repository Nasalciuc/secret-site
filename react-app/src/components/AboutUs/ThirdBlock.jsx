import secondImg from '@/assets/images/static/second.webp'

const differentiators = [
    {
        title: 'Tailor-made Experiences',
        description: 'Unlike online travel agencies, we provide a bespoke service tailored to your needs.',
    },
    {
        title: '24/7 Live Customer Support',
        description: 'We offer personalized support whenever you need it.',
    },
    {
        title: 'Exclusive Access',
        description: 'Benefit from privately negotiated contract fares with top airlines.',
    },
    {
        title: 'Unmatched Expertise',
        description:
            "Our team's combined 14+ years of industry experience means that we know the ins and outs of business class travel.",
    },
]

export default function ThirdBlock() {
    return (
        <section className="mb-about-apart">
            <span className="mb-eyebrow">The difference</span>
            <h2 className="mb-serif mb-about-apart__title">
                What Sets Us <span className="accent">Apart?</span>
            </h2>
            <div className="mb-about-apart__layout">
                <div className="mb-about-apart__media">
                    <img src={secondImg} alt="Left Image" loading="lazy" decoding="async" />
                </div>
                <div className="mb-about-apart__cards">
                    {differentiators.map((item) => (
                        <div className="mb-about-apart__card" key={item.title}>
                            <h3 className="mb-about-apart__card-title">{item.title}</h3>
                            <p className="mb-about-apart__card-body">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
