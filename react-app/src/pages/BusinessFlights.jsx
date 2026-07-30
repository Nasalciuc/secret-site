import FirstBlock from '@/components/BusinessFlights/FirstBlock'
import OrderFlyBlock from '@/components/BusinessFlights/OrderFlyBlock'
import SecondBlock from '@/components/BusinessFlights/SecondBlock'
import SeoContent from '@/components/BusinessFlights/SeoContent'

export default function BusinessFlights() {
    return (
        <div className="business-flights">
            <FirstBlock />
            <OrderFlyBlock />
            <SecondBlock />
            <SeoContent />
        </div>
    )
}
