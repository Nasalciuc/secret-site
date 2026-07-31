import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/styles'
import { useAppStore } from '@/store/useAppStore'
import { sendCouponLead } from '@/services/api'

export default function CouponForm({ autoOpen = false }) {
    const { setModal } = useAppStore()
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneValid, setPhoneValid] = useState(null)
    const [phoneE164, setPhoneE164] = useState(null)
    const [agreeToTerms, setAgreeToTerms] = useState(false)
    const [coupon] = useState('SAVE100')
    const [codeCopied, setCodeCopied] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const phoneRef = useRef(null)
    const itiRef = useRef(null)

    // Vue CouponForm opens immediately when mounted with auto-open.
    // App.jsx already delays mounting by 5s — do not add a second delay here.
    useEffect(() => {
        if (autoOpen) setShowModal(true)
    }, [autoOpen])

    useEffect(() => {
        if (!showModal) {
            if (itiRef.current) {
                itiRef.current.destroy()
                itiRef.current = null
            }
            setPhoneValid(null)
            setPhoneE164(null)
            return undefined
        }

        let inputEl = null
        const frame = requestAnimationFrame(() => {
            if (!phoneRef.current || itiRef.current) return
            inputEl = phoneRef.current

            itiRef.current = intlTelInput(inputEl, {
                loadUtils: () => import('intl-tel-input/utils'),
                initialCountry: 'us',
                countryOrder: ['us', 'gb', 'ca', 'au'],
                separateDialCode: true,
                autoPlaceholder: 'aggressive',
                formatOnDisplay: true,
            })

            const refresh = () => {
                const iti = itiRef.current
                if (!iti) {
                    setPhoneValid(null)
                    setPhoneE164(null)
                    return
                }
                const isValid = iti.isValidNumber() === true
                setPhoneValid(isValid)
                setPhoneE164(isValid ? iti.getNumber() : null)
                if (isValid) {
                    setFormErrors((prev) => ({ ...prev, phone: null }))
                }
            }

            inputEl.addEventListener('countrychange', refresh)
            inputEl.addEventListener('change', refresh)
            inputEl.addEventListener('input', refresh)
            refresh()

            inputEl._couponRefresh = refresh
        })

        return () => {
            cancelAnimationFrame(frame)
            const el = phoneRef.current || inputEl
            const refresh = el?._couponRefresh
            if (el && refresh) {
                el.removeEventListener('countrychange', refresh)
                el.removeEventListener('change', refresh)
                el.removeEventListener('input', refresh)
            }
            if (itiRef.current) {
                itiRef.current.destroy()
                itiRef.current = null
            }
        }
    }, [showModal])

    const canSubmit = useMemo(
        () => name.trim() !== '' && email.trim() !== '' && phoneValid === true && agreeToTerms && !loading,
        [name, email, phoneValid, agreeToTerms, loading],
    )

    const copyCode = () => {
        const done = () => {
            setCodeCopied(true)
            setTimeout(() => setCodeCopied(false), 2000)
        }
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(coupon).then(done).catch(done)
        } else {
            done()
        }
    }

    const closeModal = () => setShowModal(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors({})

        if (!agreeToTerms) {
            setModal({
                display: true,
                status: 'error',
                title: 'Validation error',
                body: 'You must agree to the terms and conditions.',
            })
            return
        }

        setLoading(true)

        const phone =
            phoneE164 ||
            itiRef.current?.getNumber?.() ||
            phoneRef.current?.value ||
            ''

        const [result, error] = await sendCouponLead({
            client: {
                name,
                email,
                phone: phone.replace(/\s/g, ''),
            },
            coupon,
        })

        setLoading(false)

        if (error?.type === 'validation') {
            setFormErrors({ [error.input]: true })
            setModal({
                display: true,
                status: 'error',
                title: 'Validation error',
                body: error.message,
            })
            return
        }

        if (error) {
            setModal({
                display: true,
                status: 'error',
                title: 'Request failed',
                body: 'Something went wrong',
            })
            return
        }

        if (result?.data?.success) {
            setModal({
                display: true,
                status: 'success',
                title: 'Request Successful',
                body: 'Your request was submitted successfully.',
                id: 'request-success-popup',
            })
            closeModal()
        }
    }

    if (!showModal) return null

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div
                className="modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="coupon-title"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-button" onClick={closeModal} aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="modal-columns">
                    <div className="modal-image">
                        <img
                            src="https://i.imgur.com/VcWTka1.jpeg"
                            alt="Business Class Discount"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="image-overlay">
                            <span className="badge">Limited offer</span>
                            <h3 className="image-title">
                                Fly business.
                                <br />
                                Pay less.
                            </h3>
                            <p className="image-subtitle">Exclusive saving on your next premium ticket.</p>
                        </div>
                    </div>

                    <div className="modal-form">
                        <span className="eyebrow">Exclusive offer</span>
                        <h2 id="coupon-title">
                            Save Extra <span className="amount">$100</span> Now
                        </h2>
                        <p className="lead">
                            Share your phone number and the promo code with your agent to receive an additional discount
                            on your booking.
                        </p>

                        <div className={`promo-card ${codeCopied ? 'copied' : ''}`}>
                            <div className="promo-card-label">Your promo code</div>
                            <div className="promo-card-row">
                                <span className="promo-card-value">{coupon}</span>
                                <button type="button" className="copy-btn" onClick={copyCode} aria-label="Copy code">
                                    <span>{codeCopied ? 'Copied' : 'Copy'}</span>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
                            <div className={`form-group ${formErrors.name ? 'has-error' : ''}`}>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full name"
                                    autoComplete="name"
                                />
                            </div>
                            <div className={`form-group ${formErrors.email ? 'has-error' : ''}`}>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    autoComplete="email"
                                />
                            </div>
                            <div className={`form-group iti-group ${formErrors.phone ? 'has-error' : ''}`}>
                                <input ref={phoneRef} type="tel" autoComplete="tel" />
                            </div>

                            <label className="terms">
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    required
                                />
                                <span className="terms-text">
                                    I consent to receive text messages from BuyBusinessClass for customer care and
                                    marketing. Reply &quot;STOP&quot; to opt-out. Msg &amp; data rates may apply. See our{' '}
                                    <Link to="/privacy">Privacy Policy</Link> &amp; <Link to="/terms">SMS Terms</Link>.
                                </span>
                            </label>

                            <button type="submit" className="submit-button" disabled={!canSubmit}>
                                <span>Claim my $100 discount</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path
                                        d="M3 8h10M9 4l4 4-4 4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
