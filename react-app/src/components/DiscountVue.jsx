import { useMemo } from 'react'
import { useAppStore } from '@/store/useAppStore'

const createDiscountCode = () => {
    const digits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('')
    return `BBC${digits.slice(0, 3)}-${digits.slice(3)}`
}

export default function DiscountVue() {
    const { setModal } = useAppStore()
    const discountCode = useMemo(createDiscountCode, [])

    const showDisclaimer = () => {
        setModal({
            display: true,
            status: 'info',
            title: 'Discount disclaimer',
            body: 'Discount ID savings are subject to airline availability, routing, dates, and fare rules.',
        })
    }

    return (
        <div>
            <div className="block-discount">
                <p>
                    Save extra <span style={{ color: '#b4853b' }}>$300</span> with Your Discount ID{' '}
                    <span style={{ fontWeight: 'bold', color: '#b4853b' }}>{discountCode}</span>
                </p>
                <button type="button" className="asterisk" onClick={showDisclaimer}>
                    Disclaimer*
                </button>
            </div>
        </div>
    )
}
