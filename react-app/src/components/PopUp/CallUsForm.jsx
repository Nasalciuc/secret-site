import { useEffect, useState } from 'react'

const phoneNumber = '18883227999'
const formattedPhoneNumber = '+1 (888) 322-7999'

export default function CallUsForm() {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const timer = window.setTimeout(() => setShowModal(true), 5000)
        return () => window.clearTimeout(timer)
    }, [])

    if (!showModal) return null

    return (
        <div className="call-us-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="call-us-modal-content" onClick={(event) => event.stopPropagation()}>
                <button className="call-us-close-button" type="button" onClick={() => setShowModal(false)}>
                    &times;
                </button>
                <h3 className="call-us-modal-header">Call us to book your trip now!</h3>
                <a href={`tel:${phoneNumber}`} className="call-us-button">
                    {formattedPhoneNumber}
                </a>
            </div>
        </div>
    )
}
