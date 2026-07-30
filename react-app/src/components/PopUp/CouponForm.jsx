import { useState, useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { sendCouponLead } from '@/services/api'

export default function CouponForm({ autoOpen = false }) {
    const { setModal } = useAppStore()
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [coupon, setCoupon] = useState('')
    const [codeCopied, setCodeCopied] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const phoneRef = useRef(null)

    useEffect(() => {
        if (autoOpen) {
            const timer = setTimeout(() => setShowModal(true), 5000)
            return () => clearTimeout(timer)
        }
    }, [autoOpen])

    const copyCode = () => {
        navigator.clipboard.writeText(coupon)
        setCodeCopied(true)
        setTimeout(() => setCodeCopied(false), 2000)
    }

    const closeModal = () => setShowModal(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors({})
        setLoading(true)

        const [result, error] = await sendCouponLead({
            client: { name, email, phone },
            coupon,
        })

        setLoading(false)

        if (error) {
            if (error?.type === 'validation') {
                setFormErrors({ [error.input]: true })
            }
            setModal({ display: true, status: 'error', title: 'Error', body: error.message || 'Something went wrong' })
            return
        }

        if (result?.data?.success) {
            setShowModal(false)
            setModal({ display: true, status: 'success', title: 'Success', body: 'Coupon claimed successfully!' })
        }
    }

    if (!showModal) return null

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={closeModal} aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="modal-columns">
                    <div className="modal-image">
                        <img src="https://i.imgur.com/VcWTka1.jpeg" alt="Business Class Discount" loading="lazy" decoding="async" />
                        <div className="image-overlay">
                            <span className="badge">Limited offer</span>
                            <h3 className="image-title">Fly business.<br />Pay less.</h3>
                            <p className="image-subtitle">Exclusive saving on your next premium ticket.</p>
                        </div>
                    </div>

                    <div className="modal-form">
                        <span className="eyebrow">Exclusive offer</span>
                        <h2 id="coupon-title">Save Extra <span className="amount">$100</span> Now</h2>
                        <p className="lead">
                            Share your phone number and the promo code with your agent to receive an additional discount
                            on your booking.
                        </p>

                        <div className="promo-card">
                            <div className="promo-card-label">Your promo code</div>
                            <div className="promo-card-row">
                                <span className="promo-card-value">{coupon || 'BBC100'}</span>
                                <button type="button" className="copy-btn" onClick={copyCode} aria-label="Copy code">
                                    {codeCopied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className={`form-group ${formErrors.name ? 'has-error' : ''}`}>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" />
                            </div>
                            <div className={`form-group ${formErrors.email ? 'has-error' : ''}`}>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete="email" />
                            </div>
                            <div className={`form-group iti-group ${formErrors.phone ? 'has-error' : ''}`}>
                                <input ref={phoneRef} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" autoComplete="tel" />
                            </div>
                            <button type="submit" className="orange-filled-button" disabled={loading}>
                                {loading ? 'Submitting...' : 'Claim Coupon'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
