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

export default function ContactSection() {
    const { settings, setModal } = useAppStore()
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
        const [data, error] = await contactUs({ name, email, phone, message })

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

    return (
        <div className="contact-container">
            <div className="content">
                <div className="contactus-label">Contact Us</div>
                <div className="title">
                    <p className="main-title">
                        Still <span className="accent">have questions</span> or want to{' '}
                        <span className="accent">leave us a message?</span>
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
                            By checking this box, I consent to receive text messages related to customer care and
                            marketing from BuyBusinessClass. You can reply &quot;STOP&quot; at any time to opt-out.
                            Message and data rates may apply. Message frequency may vary, text HELP for assistance. For
                            more information, please visit our <Link to="/privacy"> Privacy Policy </Link> and
                            <Link to="/terms">SMS Terms and Conditions</Link>
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
                            24/7 <span className="accent">Open customer service</span>
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
                                <span className="accent">Email Us</span>
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
                                <span className="accent">Call Us</span>
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
