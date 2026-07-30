import { useMemo, useState } from 'react'
import DisclaimerForm from '@/components/PopUp/DisclaimerForm'

const createDiscountCode = () => {
    const digits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('')
    return `BBC${digits.slice(0, 3)}-${digits.slice(3)}`
}

export default function DiscountVue() {
    const discountCode = useMemo(createDiscountCode, [])
    const [showDisclaimerModal, setShowDisclaimerModal] = useState(false)

    return (
        <div>
            <div className="block-discount">
                <p>
                    Save extra <span style={{ color: '#b4853b' }}>$300</span> with Your Discount ID{' '}
                    <span style={{ fontWeight: 'bold', color: '#b4853b' }}>{discountCode}</span>
                </p>
                <button type="button" className="asterisk" onClick={() => setShowDisclaimerModal(true)}>
                    Disclaimer*
                </button>
            </div>
            {showDisclaimerModal && <DisclaimerForm onClose={() => setShowDisclaimerModal(false)} />}
        </div>
    )
}
