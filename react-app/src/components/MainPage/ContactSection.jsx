import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { contactUs } from '@/services/api'
import OrangeFilledButton from '@/components/common/Buttons/OrangeFilledButton'
import TransparentButton from '@/components/common/Buttons/TransparentButton'
import supportImg from '@/assets/images/static/support.png'

const OFFICE_ADDRESS = '180 North Stetson Avenue Chicago, IL, 60601'
const MAPS_LINK = 'https://maps.app.goo.gl/uumk5sNfudCszvfa7'
const MAPS_EMBED =
    'https://www.google.com/maps?q=180+North+Stetson+Avenue,+Chicago,+IL+60601&hl=en&z=15&output=embed'

// On the homepage the office is the third way to reach us: its tile carries a small night map of
// Chicago (the street grid, the river, the lake and a pin on the office) and opens Google Maps. The
// map is drawn at one fixed scale and anchored on the lake, so a wider tile shows more of the city
// instead of a bigger one.
const CITY_GRID = [
    ...Array.from({ length: 40 }, (_, i) => `M${-712 + i * 28} 0V200`),
    ...Array.from({ length: 8 }, (_, i) => `M-720 ${14 + i * 26}H392`),
].join('')
// lit blocks between the streets (deterministic, so every render draws the same city)
const CITY_BLOCKS = Array.from({ length: 84 }, (_, i) => {
    const col = (i * 7) % 39
    const row = (i * 5) % 7
    return `M${-708 + col * 28} ${18 + row * 26}h20v18h-20z`
}).join('')

function OfficeMap() {
    return (
        <a className="hp-desk__map" href={MAPS_LINK} target="_blank" rel="noreferrer">
            <span className="hp-desk__view" aria-hidden="true">
                <svg className="hp-desk__city" viewBox="-720 0 1200 200" width="1200" height="200" focusable="false">
                    <path className="hp-desk__lake" d="M396 0C386 38 398 78 390 118C384 150 394 178 388 200H480V0Z" />
                    <path className="hp-desk__blocks" d={CITY_BLOCKS} />
                    <path className="hp-desk__grid" d={CITY_GRID} />
                    <path className="hp-desk__avenue" d="M344 0V200M-720 140H390" />
                    <path className="hp-desk__river" d="M390 96H252C232 96 224 88 212 66L178 0M252 96C238 104 236 122 238 142L244 200" />
                    <text className="hp-desk__water-label" x="432" y="148" textAnchor="middle">
                        LAKE MICHIGAN
                    </text>
                    <g transform="translate(356 76)">
                        <circle className="hp-desk__pin-ring" r="14" />
                        <circle className="hp-desk__pin-dot" r="7" />
                    </g>
                </svg>
            </span>
            <span className="hp-desk__place">
                <span className="hp-contact__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" focusable="false">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.36 6.69c0 1.27-.44 2.43-1.18 3.35 0 0-1.86 2.49-3.3 4.25-.46.57-1.3.57-1.76 0-1.44-1.76-3.3-4.25-3.3-4.25a5.36 5.36 0 1 1 9.54-3.35ZM10 6.67a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                        />
                    </svg>
                </span>
                <span className="hp-contact__text">
                    <span className="hp-contact__label">Office</span>
                    <span className="hp-contact__value">{OFFICE_ADDRESS}</span>
                </span>
                <span className="hp-desk__open" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" focusable="false">
                        <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <span className="sr-only">Open in Google Maps (opens in a new tab)</span>
            </span>
        </a>
    )
}

// The form's state and request, shared by the homepage's contact section and the other pages' panel.
function useContactForm() {
    const setModal = useAppStore((state) => state.setModal)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [smsConsent, setSmsConsent] = useState(false)

    const resetForm = () => {
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
        setSmsConsent(false)
    }

    const sendMessage = async () => {
        const [, error] = await contactUs({ name, email, phone, message })

        if (error) {
            setModal({
                display: true,
                status: 'error',
                body: error,
                title: 'An error occurred while sending',
            })
            return
        }

        resetForm()
        setModal({
            display: true,
            status: 'success',
            title: 'Message successfully delivered',
        })
    }

    return { name, setName, email, setEmail, phone, setPhone, message, setMessage, smsConsent, setSmsConsent, sendMessage }
}

function SmsConsentText() {
    return (
        <>
            By checking this box, I consent to receive text messages related to customer care and marketing from BuyBusinessClass. You can reply
            &quot;STOP&quot; at any time to opt-out. Message and data rates may apply. Message frequency may vary, text HELP for assistance. For
            more information, please visit our <Link to="/privacy"> Privacy Policy </Link> and <Link to="/terms">SMS Terms and Conditions</Link>
        </>
    )
}

// The homepage's contact section, in Betty's language: the ways to reach us on the left, the form
// in a card on the right, every field with its label.
function HomeContact({ form }) {
    const settings = useAppStore((state) => state.settings)
    const phoneLabel = settings?.number || '+1 (888) 322-7999'
    const phoneHref = `tel:${phoneLabel.replace(/[^\d+]/g, '')}`
    const emailAddress = settings?.email || 'cs@buybusinessclass.com'

    const onSubmit = (event) => {
        event.preventDefault()
        form.sendMessage()
    }

    return (
        <section className="hp-section hp-contact" aria-labelledby="hp-contact-title">
            <div className="hp-wrap hp-contact__grid">
                <div className="hp-contact__info">
                    <p className="hp-eyebrow">Contact us</p>
                    <h2 className="hp-h2" id="hp-contact-title">
                        Still have questions or want to leave us a message?
                    </h2>
                    <p className="hp-sub">Send us your request and one of our Travel Consultants will contact you back directly.</p>
                    <div className="hp-desk__head">
                        <span className="hp-desk__live">
                            <span className="dot" aria-hidden="true" />
                            Live
                        </span>
                        <p className="hp-desk__title">24/7 Open customer service</p>
                    </div>
                    <ul className="hp-contact__ways">
                        <li>
                            <span className="hp-contact__icon" aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" focusable="false">
                                    <path d="M2.12 6.01C1.39 4.53 2.13 2.9 3.54 2.05c.68-.41 1.56-.23 2.03.41l1.04 1.42c.44.6.51 1.4.18 2.08l-.27.55a.6.6 0 0 0-.01.5c.15.29.46.79 1.07 1.4.6.6 1.11.92 1.4 1.07.16.08.34.07.5-.01l.55-.27c.67-.34 1.47-.27 2.08.18l1.42 1.04c.64.47.82 1.35.41 2.03-.85 1.41-2.48 2.16-3.95 1.42-1.25-.62-2.84-1.64-4.52-3.33C3.77 8.84 2.74 7.25 2.12 6.01Z" />
                                </svg>
                            </span>
                            <span className="hp-contact__text">
                                <span className="hp-contact__label">Call to book · 24/7</span>
                                <a className="hp-contact__value" href={phoneHref}>
                                    {phoneLabel}
                                </a>
                            </span>
                        </li>
                        <li>
                            <span className="hp-contact__icon" aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" focusable="false">
                                    <path d="M1.72 3.48c-.15.2-.06.48.15.61l5.78 3.58c.21.13.49.13.7 0l5.78-3.58c.21-.13.3-.4.15-.61a2.33 2.33 0 0 0-1.61-.82H3.33c-.66 0-1.25.32-1.61.82Z" />
                                    <path d="M14.67 6.22c0-.39-.43-.63-.76-.43L9.05 8.8a2 2 0 0 1-2.1 0L2.1 5.8c-.33-.21-.76.03-.76.42v5.11c0 1.1.9 2 2 2h9.33c1.1 0 2-.9 2-2V6.22Z" />
                                </svg>
                            </span>
                            <span className="hp-contact__text">
                                <span className="hp-contact__label">Email us</span>
                                <a className="hp-contact__value" href={`mailto:${emailAddress}`}>
                                    {emailAddress}
                                </a>
                            </span>
                        </li>
                        <li className="hp-contact__office">
                            <OfficeMap />
                        </li>
                    </ul>
                </div>
                <form className="hp-card hp-contact__form" onSubmit={onSubmit}>
                    <div className="hp-field">
                        <label htmlFor="hp-contact-name">Name</label>
                        <input id="hp-contact-name" className="hp-input" name="name" autoComplete="name" value={form.name} onChange={(event) => form.setName(event.target.value)} />
                    </div>
                    <div className="hp-field-row">
                        <div className="hp-field">
                            <label htmlFor="hp-contact-email">E-mail</label>
                            <input
                                id="hp-contact-email"
                                className="hp-input"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={(event) => form.setEmail(event.target.value)}
                            />
                        </div>
                        <div className="hp-field">
                            <label htmlFor="hp-contact-phone">Phone</label>
                            <input
                                id="hp-contact-phone"
                                className="hp-input"
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                value={form.phone}
                                onChange={(event) => form.setPhone(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="hp-field hp-field--message">
                        <label htmlFor="hp-contact-message">Message</label>
                        <textarea id="hp-contact-message" className="hp-input" name="message" rows="4" value={form.message} onChange={(event) => form.setMessage(event.target.value)} />
                    </div>
                    <label className="hp-check">
                        <input type="checkbox" checked={form.smsConsent} onChange={(event) => form.setSmsConsent(event.target.checked)} />
                        <span>
                            <SmsConsentText />
                        </span>
                    </label>
                    <button className="hp-btn hp-btn--gold hp-btn--block" type="submit">
                        Send message
                    </button>
                </form>
            </div>
        </section>
    )
}

// variant="home": the homepage section above; every other page keeps the plain panel below.
export default function ContactSection({ variant }) {
    const form = useContactForm()
    const settings = useAppStore((state) => state.settings)
    const { name, setName, email, setEmail, phone, setPhone, message, setMessage, smsConsent, setSmsConsent, sendMessage } = form

    if (variant === 'home') return <HomeContact form={form} />

    return (
        <div className="contact-container">
            <div className="content">
                <div className="title">
                    <p className="main-title">
                        Still have questions or want to{' '}
                        leave us a message?
                    </p>
                </div>
                <div className="subtitle">
                    Submit your request in the box below and one of our Travel Consultants will contact you back
                    directly.
                </div>
                <div className="form-container">
                    <div className="input-container">
                        <input
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            name="email"
                            placeholder="E-Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            name="phone"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="leave-message">
                        <div className="textarea-container">
                            <textarea
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="sms-toggle">
                        <label>
                            <input
                                type="checkbox"
                                checked={smsConsent}
                                onChange={(e) => setSmsConsent(e.target.checked)}
                            />
                            {' '}
                            <SmsConsentText />
                        </label>
                    </div>
                    <OrangeFilledButton buttonText="Send" click={sendMessage} />
                </div>
                <div className="adaptive">
                    <div className="position-relative">
                        <div className="d-flex">
                            <div className="instructions">
                                <div className="svg">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2.12183 6.00694C1.38628 4.5308 2.12844 2.9017 3.54266 2.05317C4.22354 1.64464 5.10353 1.82193 5.5731 2.46225L6.61487 3.88286C7.05828 4.4875 7.12624 5.28937 6.79091 5.96001L6.51776 6.50631C6.43869 6.66446 6.42619 6.84739 6.50707 7.00462C6.65444 7.29106 6.96825 7.79869 7.57278 8.40322C8.17731 9.00775 8.68493 9.32156 8.97138 9.46892C9.1286 9.54981 9.31154 9.53731 9.46969 9.45823L10.016 9.18508C10.6866 8.84976 11.4885 8.91772 12.0931 9.36113L13.5137 10.4029C14.1541 10.8725 14.3314 11.7525 13.9228 12.4333C13.0743 13.8476 11.4452 14.5897 9.96906 13.8542C8.72498 13.2343 7.1352 12.2083 5.45146 10.5245C3.76772 8.8408 2.74175 7.25102 2.12183 6.00694Z"
                                            fill="#b4853b"
                                        />
                                    </svg>
                                </div>
                                <div className="title">Call to Book</div>
                                <div className="body">
                                    <a className="tel" href={`tel:${settings?.number}`}>
                                        {settings?.number}
                                    </a>
                                </div>
                            </div>
                            <TransparentButton
                                buttonText="Let’s have a chat"
                                link="tel:+18883227999"
                                regularLink
                            />
                        </div>
                        <div className="d-flex">
                            <div className="instructions">
                                <div className="svg">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.71988 3.48395C1.57233 3.685 1.6603 3.9574 1.87234 4.08866L7.64904 7.66471C7.86404 7.79781 8.13584 7.79781 8.35084 7.66471L14.1276 4.0886C14.3397 3.95733 14.4276 3.68493 14.2801 3.48387C13.9161 2.98795 13.329 2.66602 12.6667 2.66602H3.33334C2.671 2.66602 2.08386 2.98798 1.71988 3.48395Z"
                                            fill="#b4853b"
                                        />
                                        <path
                                            d="M14.6667 6.22062C14.6667 5.82887 14.2366 5.58929 13.9035 5.79549L9.05265 8.7984C8.40764 9.19769 7.59224 9.19769 6.94723 8.7984L2.09652 5.79558C1.76343 5.58938 1.33334 5.82895 1.33334 6.22071V11.3327C1.33334 12.4373 2.22877 13.3327 3.33334 13.3327H12.6667C13.7712 13.3327 14.6667 12.4373 14.6667 11.3327V6.22062Z"
                                            fill="#b4853b"
                                        />
                                    </svg>
                                </div>
                                <div className="title">Email Us</div>
                                <div className="body">
                                    <a className="tel" href={`mailto:${settings?.email}`}>
                                        {settings?.email}
                                    </a>
                                </div>
                            </div>
                            <TransparentButton
                                buttonText="Write an email to us"
                                link={`mailto:${settings?.email}`}
                                regularLink
                            />
                        </div>
                        <div className="d-flex">
                            <div className="instructions">
                                <div className="svg">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.3564 6.69051C13.3564 7.95725 12.9167 9.1213 12.1816 10.0383H12.1847C12.1847 10.0383 10.3231 12.5295 8.88091 14.2935C8.42081 14.8563 7.5792 14.8561 7.11938 14.2931C5.68181 12.533 3.82258 10.0437 3.82258 10.0437L3.81824 10.0383C3.08312 9.1213 2.6434 7.95725 2.6434 6.69051C2.6434 3.73218 5.0416 1.33398 7.99992 1.33398C10.9582 1.33398 13.3564 3.73218 13.3564 6.69051ZM10 6.66732C10 7.77189 9.10458 8.66732 8.00001 8.66732C6.89544 8.66732 6.00001 7.77189 6.00001 6.66732C6.00001 5.56275 6.89544 4.66732 8.00001 4.66732C9.10458 4.66732 10 5.56275 10 6.66732Z"
                                            fill="#b4853b"
                                        />
                                    </svg>
                                </div>
                                <div className="title">Address</div>
                                <div className="body">{OFFICE_ADDRESS}</div>
                            </div>
                            <TransparentButton
                                buttonText="Show on map"
                                target="_blank"
                                link={MAPS_LINK}
                                regularLink
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="contacts">
                <div className="customer-service">
                    <div className="customer-service__contacts">
                        <div className="title">
                            24/7 Open customer service
                        </div>
                        <a href="mailto:cs@buybusinessclass.com">
                            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.71988 3.48395C1.57233 3.685 1.6603 3.9574 1.87234 4.08866L7.64904 7.66471C7.86404 7.79781 8.13584 7.79781 8.35084 7.66471L14.1276 4.0886C14.3397 3.95733 14.4276 3.68493 14.2801 3.48387C13.9161 2.98795 13.329 2.66602 12.6667 2.66602H3.33334C2.671 2.66602 2.08386 2.98798 1.71988 3.48395Z"
                                    fill="#111315"
                                />
                                <path
                                    d="M14.6667 6.22062C14.6667 5.82887 14.2366 5.58929 13.9035 5.79549L9.05265 8.7984C8.40764 9.19769 7.59224 9.19769 6.94723 8.7984L2.09652 5.79558C1.76343 5.58938 1.33334 5.82895 1.33334 6.22071V11.3327C1.33334 12.4373 2.22877 13.3327 3.33334 13.3327H12.6667C13.7712 13.3327 14.6667 12.4373 14.6667 11.3327V6.22062Z"
                                    fill="#111315"
                                />
                            </svg>
                            <span className="content">
                                Email Us
                                cs@buybusinessclass
                            </span>
                        </a>
                        <a href="tel:+18559552040">
                            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.12183 6.00694C1.38628 4.5308 2.12844 2.9017 3.54266 2.05317C4.22354 1.64464 5.10353 1.82193 5.5731 2.46225L6.61487 3.88286C7.05828 4.4875 7.12624 5.28937 6.79091 5.96001L6.51776 6.50631C6.43869 6.66446 6.42619 6.84739 6.50707 7.00462C6.65444 7.29106 6.96825 7.79869 7.57278 8.40322C8.17731 9.00775 8.68493 9.32156 8.97138 9.46892C9.1286 9.54981 9.31154 9.53731 9.46969 9.45823L10.016 9.18508C10.6866 8.84976 11.4885 8.91772 12.0931 9.36113L13.5137 10.4029C14.1541 10.8725 14.3314 11.7525 13.9228 12.4333C13.0743 13.8476 11.4452 14.5897 9.96906 13.8542C8.72498 13.2343 7.1352 12.2083 5.45146 10.5245C3.76772 8.8408 2.74175 7.25102 2.12183 6.00694Z"
                                    fill="#111315"
                                />
                            </svg>
                            <span className="content">
                                Call Us
                                +1 (855)-955-2040
                            </span>
                        </a>
                    </div>
                    <img src={supportImg} alt="customer service" loading="lazy" decoding="async" />
                </div>
                <div className="google-map">
                    <iframe
                        src={MAPS_EMBED}
                        width="500"
                        height="450"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Google Map — ${OFFICE_ADDRESS}`}
                    />
                </div>
            </div>
        </div>
    )
}
