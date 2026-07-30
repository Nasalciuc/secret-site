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
        <div className="team-section">
            <div className="team-header-second">
                <h2 style={{ fontFamily: 'SSP-bold' }}>Your Personal Travel Managers</h2>
                <p style={{ fontFamily: 'Inter, sans-serif', lineHeight: '24px', fontWeight: 400, color: '#8e969e' }}>
                    We believe in one-on-one service.
                    <br />
                    When you book with us, you'll be paired with your very own Personal Travel Manager who will handle
                    <br />
                    everything - from itinerary planning to post-flight follow-ups.
                </p>
            </div>

            <div className="team-grid">
                {teamMembers.map((member) => (
                    <div className="team-member" key={member.name}>
                        <img src={member.image} alt={member.name} loading="lazy" decoding="async" />
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
