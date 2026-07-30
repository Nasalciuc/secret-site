import { useAppStore } from '@/store/useAppStore'

export default function PersonaAssistant({ className = '' }) {
    const { settings } = useAppStore()
    const phone = settings?.number || '+1 (888) 322-7999'

    return (
        <div className={`personal-assistant ${className}`.trim()}>
            <h5>24/7 LIVE SERVICE</h5>
            <div className="d-flex">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99935 6.66634C9.10392 6.66634 9.99935 5.77091 9.99935 4.66634C9.99935 3.56177 9.10392 2.66634 7.99935 2.66634C6.89478 2.66634 5.99935 3.56177 5.99935 4.66634C5.99935 5.77091 6.89478 6.66634 7.99935 6.66634ZM7.99935 7.99967C9.8403 7.99967 11.3327 6.50729 11.3327 4.66634C11.3327 2.82539 9.8403 1.33301 7.99935 1.33301C6.1584 1.33301 4.66602 2.82539 4.66602 4.66634C4.66602 6.50729 6.1584 7.99967 7.99935 7.99967Z"
                        fill="#DADDE0"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 10.6663C4.52724 10.6663 3.33333 11.8602 3.33333 13.333V13.9997C3.33333 14.3679 3.03486 14.6663 2.66667 14.6663C2.29848 14.6663 2 14.3679 2 13.9997V13.333C2 11.1239 3.79086 9.33301 6 9.33301H10C12.2091 9.33301 14 11.1239 14 13.333V13.9997C14 14.3679 13.7015 14.6663 13.3333 14.6663C12.9651 14.6663 12.6667 14.3679 12.6667 13.9997V13.333C12.6667 11.8602 11.4728 10.6663 10 10.6663H6Z"
                        fill="#DADDE0"
                    />
                </svg>
                <p>Personal Assistant</p>
            </div>
            <p className="call">Call us to lock in your low fare right now</p>
            <a href={`tel:${phone}`} className="phone">
                {phone}
            </a>
        </div>
    )
}
