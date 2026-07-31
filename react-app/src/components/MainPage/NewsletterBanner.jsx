import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default function NewsletterBanner() {
    const [email, setEmail] = useState('')
    const [consent, setConsent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const getUtm = () => {
        const p = new URLSearchParams(window.location.search)
        const out = {}
        ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => {
            if (p.get(k)) out[`_${k}`] = p.get(k)
        })
        return out
    }

    const marketingPayload = () => ({
        _consent: consent ? 'yes' : 'no',
        _source: 'newsletter_banner',
        _referrer: document.referrer || '',
        _path: window.location.pathname,
        _timestamp: new Date().toISOString(),
        ...getUtm(),
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!/.+@.+\..+/.test(email)) {
            setError('Please enter a valid email.')
            return
        }
        if (!consent) {
            setError('Please agree to receive emails.')
            return
        }

        setLoading(true)
        try {
            const payload = {
                email: email.trim().toLowerCase(),
                ...marketingPayload(),
            }
            const { data } = await axios.post(`${API_URL}/contacts/subscribe`, payload)

            if (data?.success) {
                setEmail('')
                setConsent(false)
                setSuccess('Thank you! You have successfully subscribed to our newsletter.')
            } else {
                setError('Subscription failed. Please try again.')
            }
        } catch (e) {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="newsletter-banner">
            <div className="nb-container">
                <h2 className="nb-title">Get Exclusive Business Class Flight Deals First</h2>
                <h2 className="nb-subtitle">
                    Join our newsletter to get first access to our latest sales and exclusive business class offers you
                    won't find online.
                </h2>

                <form className="nb-form" onSubmit={onSubmit}>
                    <label className="sr-only" htmlFor="nb-email">E-mail</label>
                    <input
                        id="nb-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="E-mail"
                        className={`nb-input ${error ? 'invalid' : ''}`}
                        required
                    />
                    <button className="nb-btn" type="submit" disabled={loading}>
                        {loading ? 'Submitting…' : 'Subscribe Free'}
                    </button>
                    {error && <p className="error-msg">{error}</p>}
                    {success && <p className="success-msg">{success}</p>}
                </form>

                <div className="nb-consent">
                    <label className="nb-checkbox">
                        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                        <span></span>
                    </label>
                    <small className="nb-legal">
                        I agree to receive promotional emails with exclusive offers and updates. Consent isn't required for
                        purchase. I accept the <Link to="/terms">T&C</Link> and
                        <Link to="/privacy">Privacy Policy</Link>.
                        <br />
                        Your <strong>privacy</strong> is 100% protected. Unsubscribe anytime.
                    </small>
                </div>
            </div>
        </section>
    )
}
