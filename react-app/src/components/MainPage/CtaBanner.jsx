import { useAppStore } from '@/store/useAppStore'

export default function CtaBanner() {
    const settings = useAppStore((state) => state.settings)
    const phoneHref = settings?.number || '+18883227999'
    const phoneLabel = settings?.number || '+1 (888) 322-7999'

    const scrollToOrderFly = () => {
        document.getElementById('order-fly')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="mb-cta">
            <div className="mb-cta-inner">
                <h2 className="mb-cta-title">Ready to experience business class for less?</h2>
                <p className="mb-cta-subtitle">Join thousands of smart travelers.</p>
                <div className="mb-cta-actions">
                    <button type="button" className="mb-btn-gold" onClick={scrollToOrderFly}>
                        Get my free quote
                    </button>
                    <a className="mb-btn-outline" href={`tel:${phoneHref}`}>
                        Call {phoneLabel}
                    </a>
                </div>
            </div>
        </section>
    )
}
