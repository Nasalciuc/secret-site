import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import intlTelInput from 'intl-tel-input/intlTelInputWithUtils'
import 'intl-tel-input/styles'
import OrangeFilledButton from '@/components/common/Buttons/OrangeFilledButton'
import ChooseProperties from './ChooseProperties'

export default function ClientInfo({ errors, onButtonClick }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(null)
    const [type, setType] = useState('Business Class')
    const [travelers, setTravelers] = useState({ adult: 1, child: 0, infant: 0 })
    const phoneRef = useRef(null)
    const itiRef = useRef(null)

    useEffect(() => {
        if (!phoneRef.current || itiRef.current) return

        itiRef.current = intlTelInput(phoneRef.current, {
            initialCountry: 'us',
            countryOrder: ['us', 'gb', 'ca', 'au'],
            separateDialCode: true,
            autoPlaceholder: 'aggressive',
            formatOnDisplay: true,
        })

        const refresh = () => {
            const iti = itiRef.current
            if (!iti) return
            setValid(iti.isValidNumber())
        }

        phoneRef.current.addEventListener('countrychange', refresh)
        phoneRef.current.addEventListener('input', refresh)
        refresh()

        return () => {
            phoneRef.current?.removeEventListener('countrychange', refresh)
            phoneRef.current?.removeEventListener('input', refresh)
            itiRef.current?.destroy()
            itiRef.current = null
        }
    }, [])

    const handleSubmit = () => {
        const iti = itiRef.current
        const phoneE164 = iti?.getNumber?.() || phoneRef.current?.value || ''
        const isValid = iti?.isValidNumber?.() ?? phoneE164.replace(/\D/g, '').length >= 5
        setValid(isValid)

        onButtonClick?.({
            phone_valid: isValid,
            cabin_class: type.toLowerCase().replace(/ /g, '_').replace(/_class/, ''),
            passengers: travelers,
            client: {
                name,
                phone: phoneE164.replace(/ /g, ''),
                email,
            },
        })
    }

    return (
        <div className="client-info">
            <div className="first-row">
                <input
                    name="name"
                    placeholder="Name"
                    className={`input-name ${errors?.name ? 'has-error' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className={`iti-group ${valid === true ? 'valid' : ''} ${valid === false ? 'not-valid' : ''} ${errors?.phone ? 'has-error' : ''}`}>
                    <input ref={phoneRef} type="tel" autoComplete="tel" />
                </div>
                <input
                    name="email"
                    placeholder="email@example.com"
                    className={`input-email ${errors?.email ? 'has-error' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="second-row">
                <ChooseProperties propType={type} propTravelers={travelers} onTypeChange={setType} onTravelersChange={setTravelers} />
                <OrangeFilledButton className="search-submit" buttonText="Get Free Quote" click={handleSubmit} />
            </div>
            <div className="privacy-text">
                By submitting, you agree to our <Link to="/privacy">Privacy Policy</Link> and consent to receive SMS.
            </div>
        </div>
    )
}
