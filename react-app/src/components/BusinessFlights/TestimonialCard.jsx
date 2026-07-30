import locationIcon from '@/assets/images/static/loc.png'
import calendarIcon from '@/assets/images/static/calendar.png'

export default function TestimonialCard({ testimonial }) {
    return (
        <div className="testimonial-card">
            <div className="testimonial-header">
                <h3>{testimonial.name}</h3>
                <div className="trustpilot-stars" aria-label="5 stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                </div>
            </div>
            <div className="testimonial-location">
                <img src={locationIcon} alt="Location Icon" className="location-icon" loading="lazy" decoding="async" />
                <span>{testimonial.location}</span>
                <div className="testimonial-calendar">
                    <img src={calendarIcon} alt="Calendar Icon" className="calendar-icon" loading="lazy" decoding="async" />
                    <span>{testimonial.date}</span>
                </div>
            </div>
            <div className="testimonial-text">{testimonial.text}</div>
        </div>
    )
}
