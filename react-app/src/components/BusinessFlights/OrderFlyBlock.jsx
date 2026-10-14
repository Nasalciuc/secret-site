import OrderFly from '@/components/HeaderForm/OrderFly/OrderFly'

export default function OrderFlyBlock() {
    return (
        <section className="business-order-fly">
            <h2 style={{ fontFamily: 'var(--mb-font-display)', color: 'var(--mb-text)', textAlign: 'center', paddingBottom: 20 }}>
                Search the Best Business Class Flight Deals Today
            </h2>
            <div className="header-form-business">
                <OrderFly />
            </div>
        </section>
    )
}
