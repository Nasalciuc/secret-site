import googleReviewsImg from '@/assets/images/static/google-reviews.webp'
import GoogleReviewCarousel from './GoogleReviewCarousel'

export default function GoogleReview() {
    return (
        <>
            <div className="google-review-wrapper">
                <a href="https://g.page/r/CesDQbfDx7lREAE/review" target="_blank" rel="noopener noreferrer">
                    <img
                        src={googleReviewsImg}
                        alt="Google Map"
                        className="google-review-img"
                        loading="lazy"
                        decoding="async"
                    />
                </a>
            </div>
            <GoogleReviewCarousel />
        </>
    )
}
