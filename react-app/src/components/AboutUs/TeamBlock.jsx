import theodorImg from '@/assets/images/static/theodor.webp'
import marcelImg from '@/assets/images/static/marcel.webp'
import robertaImg from '@/assets/images/static/roberta.webp'

const teamMembers = [
    { name: 'Jessica', role: 'Travel Expert', image: theodorImg },
    { name: 'Julia', role: 'Customer Service Manager', image: marcelImg },
    { name: 'Michael', role: 'Sales Manager', image: robertaImg },
]

export default function TeamBlock() {
    return (
        <div className="mb-about-team">
            <div className="mb-about-team__intro">
                <h2 className="mb-serif mb-about-team__intro-title">Your Personal Travel Managers</h2>
                <p className="mb-about-team__intro-text">
                    We believe in one-on-one service.
                    <br />
                    When you book with us, you'll be paired with your very own Personal Travel Manager who will handle
                    <br />
                    everything - from itinerary planning to post-flight follow-ups.
                </p>
            </div>

            <div className="mb-about-team__grid">
                {teamMembers.map((member) => (
                    <div className="mb-about-team__card" key={member.name}>
                        <img src={member.image} alt={member.name} loading="lazy" decoding="async" />
                        <h3 className="mb-about-team__name">{member.name}</h3>
                        <p className="mb-about-team__role">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
