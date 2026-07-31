import { Link } from 'react-router-dom'

export default function Error404() {
    return (
        <div className="error-404 mb-page">
            <span className="mb-eyebrow">Error</span>
            <h1 className="mb-serif">404</h1>
            <p>Page not found</p>
            <Link className="mb-btn-gold" to="/">Back to homepage</Link>
        </div>
    )
}
