import SecondBlock from '@/components/HeaderForm/FlightCard/SecondBlock'
import { sendFBLead } from '@/services/api'

export default function SendFacebookPage() {
    return (
        <div className="send-facebook-page mb-page">
            <SecondBlock leadSender={sendFBLead} trackDataLayer={false} />
        </div>
    )
}
