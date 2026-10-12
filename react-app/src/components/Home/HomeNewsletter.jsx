import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Barcode from '@/components/common/Barcode'
import { PLANE_D } from '@/components/MainPage/planeShape'

const API_URL = import.meta.env.VITE_API_URL

// The newsletter as a golden ticket: the offer, the e-mail field, the button and the consent on the
// ticket, and a stub that holds seat 1A behind a perforated tear line. Same request as before (POST
// /contacts/subscribe with the consent and the marketing source); consent is required.
export default function HomeNewsletter() {
    const [email, setEmail] = useState('')
    const [consent, setConsent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const utm = () => {
        const params = new URLSearchParams(window.location.search)
        const out = {}
        ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
            if (params.get(key)) out[`_${key}`] = params.get(key)
        })
        return out
    }

    const onSubmit = async (event) => {
        event.preventDefault()
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
            const { data } = await axios.post(`${API_URL}/contacts/subscribe`, {
                email: email.trim().toLowerCase(),
                _consent: consent ? 'yes' : 'no',
                _source: 'newsletter_banner',
                _referrer: document.referrer || '',
                _path: window.location.pathname,
                _timestamp: new Date().toISOString(),
                ...utm(),
            })
            if (data?.success) {
                setEmail('')
                setConsent(false)
                setSuccess('Thank you! You have successfully subscribed to our newsletter.')
            } else {
                setError('Subscription failed. Please try again.')
            }
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="hp-section hp-news" aria-labelledby="hp-news-title">
            <div className="hp-wrap">
                <div className="hp-ticket">
                    <div className="hp-ticket__main">
                        <svg className="hp-ticket__watermark" viewBox="-11 -10 22 20" aria-hidden="true" focusable="false">
                            <path d={PLANE_D} />
                        </svg>
                        <h2 className="hp-ticket__title" id="hp-news-title">
                            Get exclusive business class flight deals first
                        </h2>
                        <p className="hp-ticket__sub">
                            Join our newsletter to get first access to our latest sales and exclusive business class offers you won&apos;t find
                            online.
                        </p>
                        <form className="hp-ticket__form" onSubmit={onSubmit} noValidate>
                            <div className="hp-ticket__row">
                                <label className="sr-only" htmlFor="hp-news-email">
                                    E-mail
                                </label>
                                <input
                                    id="hp-news-email"
                                    className="hp-ticket__input"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Your e-mail"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    aria-invalid={error ? 'true' : undefined}
                                    aria-describedby={error || success ? 'hp-news-status' : undefined}
                                />
                                <button className="hp-btn hp-btn--ink" type="submit" disabled={loading}>
                                    {loading ? 'Submitting…' : 'Subscribe free'}
                                </button>
                            </div>
                            <label className="hp-ticket__check">
                                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                                <span>
                                    I agree to receive promotional emails with exclusive offers and updates. Consent isn&apos;t required for
                                    purchase. I accept the <Link to="/terms">T&amp;C</Link> and <Link to="/privacy">Privacy Policy</Link>. Your
                                    privacy is 100% protected. Unsubscribe anytime.
                                </span>
                            </label>
                            {(error || success) && (
                                <p className={`hp-ticket__status${error ? ' is-error' : ' is-ok'}`} id="hp-news-status" role={error ? 'alert' : 'status'}>
                                    {error || success}
                                </p>
                            )}
                        </form>
                    </div>
                    <div className="hp-ticket__stub" aria-hidden="true">
                        <span className="hp-ticket__brand">
                            <svg viewBox="-11 -10 22 20" focusable="false">
                                <path d={PLANE_D} />
                            </svg>
                            First access
                        </span>
                        <span className="hp-ticket__field">
                            <span className="hp-ticket__label">Class</span>
                            <span className="hp-ticket__value">Business</span>
                        </span>
                        <span className="hp-ticket__field">
                            <span className="hp-ticket__label">Seat</span>
                            <span className="hp-ticket__value">1A</span>
                        </span>
                        <Barcode className="hp-ticket__barcode" seed="first access seat 1A" />
                    </div>
                </div>
            </div>
        </section>
    )
}
