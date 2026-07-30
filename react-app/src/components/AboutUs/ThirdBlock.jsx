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
        <div>
            <div className="choose-description-apart">
                <div className="title">
                    <h2 className="main-title" style={{ fontFamily: 'SSP-bold' }}>
                        What Sets Us Apart?
                    </h2>
                </div>
            </div>
            <div className="image-box-section">
                <div className="image-container">
                    <img src={secondImg} alt="Left Image" loading="lazy" decoding="async" />
                </div>
                <div className="box-container">
                    {differentiators.map((item) => (
                        <div className="box" key={item.title}>
                            <span style={{ color: '#f2f2f3', fontSize: '18px', fontWeight: 'bold' }}>{item.title}</span>
                            <p style={{ paddingTop: '10px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
