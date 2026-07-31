import { useEffect } from 'react'
import SecondBlock from '@/components/HeaderForm/FlightCard/SecondBlock'

export default function PromoPage() {
    useEffect(() => {
        let canonicalLink = document.querySelector('link[rel="canonical"]')
        if (!canonicalLink) {
            canonicalLink = document.createElement('link')
            canonicalLink.rel = 'canonical'
            document.head.appendChild(canonicalLink)
        }
        canonicalLink.href = 'https://buybusinessclass.com/promo/senior-business-class-discounts'
    }, [])

    return (
        <div className="promo-page mb-page mb-promo">
            <div className="container-airline">
                <div className="content-wrapper">
                    <div className="airline-details">
                        <div className="promo-container">
                            <h2 className="promo-title mb-serif">
                                EXCLUSIVE SENIOR DISCOUNTS on <br />
                                <span>Business Class Flights</span>
                            </h2>
                            <p className="promo-description">
                                Book today and save up to <strong>60%*</strong> OFF - tailored senior business class
                                flight deals for travelers looking for comfort and style.
                            </p>
                            <div className="promo-price-box">
                                <div className="promo-price">
                                    <span className="from-text">FROM</span>
                                    <div className="price-amount">
                                        $1,775<span className="asterisk">*</span>
                                    </div>
                                    <div className="price-note">Round-Trip, All-Inclusive</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SecondBlock />
                </div>
            </div>
        </div>
    )
}
