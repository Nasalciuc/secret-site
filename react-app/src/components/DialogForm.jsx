import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import OrderFly from '@/components/HeaderForm/OrderFly/OrderFly'
import callCenterAgent from '@/assets/images/static/call-center-agent.webp'

export default function DialogForm() {
    const [open, setOpen] = useState(false)
    const location = useLocation()
    const quoteLoading = useAppStore((s) => s.quoteLoading)
    const settings = useAppStore((s) => s.settings)
    const phone = settings?.number || '+18559552040'
    const phoneLabel = settings?.number || '+1 (855) 955-2040'

    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    useEffect(() => {
        const jdiv = document.querySelector('jdiv')
        if (jdiv) jdiv.style.display = open ? 'none' : 'block'
        document.body.style.overflow = open ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
            if (jdiv) jdiv.style.display = 'block'
        }
    }, [open])

    return (
        <>
            <button type="button" className="trigger" aria-label="Open quote form" onClick={() => setOpen(true)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.12183 6.00694C1.38628 4.5308 2.12844 2.9017 3.54266 2.05317C4.22354 1.64464 5.10353 1.82193 5.5731 2.46225L6.61487 3.88286C7.05828 4.4875 7.12624 5.28937 6.79091 5.96001L6.51776 6.50631C6.43869 6.66446 6.42619 6.84739 6.50707 7.00462C6.65444 7.29106 6.96825 7.79869 7.57278 8.40322C8.17731 9.00775 8.68493 9.32156 8.97138 9.46892C9.1286 9.54981 9.31154 9.53731 9.46969 9.45823L10.016 9.18508C10.6866 8.84976 11.4885 8.91772 12.0931 9.36113L13.5137 10.4029C14.1541 10.8725 14.3314 11.7525 13.9228 12.4333C13.0743 13.8476 11.4452 14.5897 9.96906 13.8542C8.72498 13.2343 7.1352 12.2083 5.45146 10.5245C3.76772 8.8408 2.74175 7.25102 2.12183 6.00694Z"
                        fill="#f4f4f4"
                    />
                </svg>
            </button>

            {open && (
                <>
                    <div className="dialog-overlay" onClick={() => setOpen(false)} />
                    {!quoteLoading?.loading && (
                        <div className="dialog-content" role="dialog" aria-modal="true" aria-label="Order Form">
                            <button type="button" className="close" aria-label="Close" onClick={() => setOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                                </svg>
                            </button>
                            <div className="call-block">
                                <div className="call-block__head">
                                    <div className="content">
                                        <div className="title">CALL TO SPEAK</div>
                                        <div>Live concierge available 24/7</div>
                                    </div>
                                    <img src={callCenterAgent} alt="call center agent" loading="lazy" decoding="async" />
                                </div>
                                <a href={`tel:${phone}`}>{phoneLabel}</a>
                            </div>
                            <div className="separator">Or</div>
                            <h3 className="form-header">REQUEST A FREE QUOTE</h3>
                            <OrderFly />
                        </div>
                    )}
                </>
            )}
        </>
    )
}
