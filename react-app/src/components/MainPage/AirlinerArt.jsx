import { useId } from 'react'

// Our own airliner for the closing call to action: a long-haul twin in the house colours — white with
// a gold cheatline and a gold tail carrying the BuyBusinessClass mark — and two contrails behind it.
// Side view, nose to the right, 1000 x 320 units; the contrails reach back past the left edge
// (the svg does not clip them). Decorative.
const FUSELAGE =
    'M92 124C140 120 200 118 260 118L845 118C885 118 915 126 932 140C944 150 946 164 936 174C922 186 896 190 860 190L330 190C270 190 190 168 100 138C90 135 84 131 86 127C87 125 89 124 92 124Z'
const FIN = 'M296 120L204 14C198 7 193 4 185 4L158 4C149 4 145 9 143 15L112 124Z'
// the BuyBusinessClass mark (from the logo), drawn in white on the tail
const MARK =
    'M34.6646 69.3642C44.6426 69.3642 53.6887 65.1927 60.0414 58.401L4.07421 51.0233C9.97834 61.8832 21.4063 69.3642 34.6646 69.3642ZM34.6646 0C28.3806 0 22.4768 1.68916 17.3669 4.61964C26.7578 6.17111 33.1108 13.1006 39.4293 20.7195C32.0752 15.2727 24.134 13.5835 15.8821 12.5491C14.9844 12.4458 13.7412 11.8596 13.3965 11.2045C12.9473 10.2737 12.5677 9.27371 12.2223 8.27405C4.73026 14.6176 0 24.0638 0 34.6132C0 38.2332 0.552283 41.7496 1.58825 45.1283H67.7754C68.811 41.8529 69.3636 38.3365 69.3636 34.6132C69.4671 15.514 53.8266 0 34.6646 0ZM30.7286 40.7499C28.001 40.7499 25.4116 39.5086 24.1684 37.0263C20.9575 30.6831 18.1264 24.0982 14.9499 17.2032C25.0317 17.2032 34.112 18.0996 41.4661 24.2359C47.474 29.2005 58.6948 40.8876 58.6948 40.8876L30.7286 40.7499Z'
const DOORS = [380, 640, 812]
const WINDOWS = Array.from({ length: 41 }, (_, i) => 262 + i * 14).filter((x) => DOORS.every((d) => x <= d - 12 || x >= d + 22))
const GOLD = { stopColor: 'var(--mb-gold)' }
const GOLD_LIGHT = { stopColor: 'var(--mb-gold-light)' }
const GOLD_INK = { stopColor: 'var(--mb-gold-ink)' }

export default function Airliner({ className = '' }) {
    const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
    const id = (name) => `air-${uid}-${name}`
    const url = (name) => `url(#${id(name)})`

    return (
        <svg className={className} viewBox="0 0 1000 320" overflow="visible" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id={id('skin')} x1="0" y1="118" x2="0" y2="190" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="0.45" stopColor="#eef1f6" />
                    <stop offset="0.8" stopColor="#cfd5df" />
                    <stop offset="1" stopColor="#b4bcc9" />
                </linearGradient>
                <linearGradient id={id('sunset')} x1="0" y1="140" x2="0" y2="192" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#f6b46a" stopOpacity="0" />
                    <stop offset="1" stopColor="#f3a35c" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id={id('fin')} x1="0" y1="4" x2="0" y2="124" gradientUnits="userSpaceOnUse">
                    <stop offset="0" style={GOLD_LIGHT} />
                    <stop offset="0.55" style={GOLD} />
                    <stop offset="1" style={GOLD_INK} />
                </linearGradient>
                <linearGradient id={id('wing')} x1="0" y1="146" x2="0" y2="272" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#e4e8ee" />
                    <stop offset="1" stopColor="#aeb6c4" />
                </linearGradient>
                <linearGradient id={id('nacelle')} x1="0" y1="200" x2="0" y2="250" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#f4f6f9" />
                    <stop offset="0.55" stopColor="#d3d9e2" />
                    <stop offset="1" stopColor="#9ea7b6" />
                </linearGradient>
                <linearGradient id={id('trail')} x1="520" y1="0" x2="-760" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="0.06" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.32" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <filter id={id('soft')} x="-5%" y="-200%" width="110%" height="500%">
                    <feGaussianBlur stdDeviation="1.6" />
                </filter>
                <clipPath id={id('fuselage')}>
                    <path d={FUSELAGE} />
                </clipPath>
            </defs>

            <g className="mb-air__trails" filter={url('soft')}>
                <path d="M520 206L-760 192L-760 204L520 210Z" fill={url('trail')} opacity="0.55" />
                <path d="M520 220L-760 214L-760 232L520 225Z" fill={url('trail')} />
            </g>

            <path d={FIN} fill={url('fin')} />
            <path d={MARK} transform="translate(168 36) scale(0.72)" fill="#ffffff" />

            <path d={FUSELAGE} fill={url('skin')} />
            <g clipPath={url('fuselage')}>
                <rect x="0" y="140" width="1000" height="60" fill={url('sunset')} />
                <path d="M250 121L846 121" stroke="#ffffff" strokeWidth="2" opacity="0.9" />
                <path d="M940 168L330 168C280 168 200 152 110 128" fill="none" strokeWidth="5" style={{ stroke: 'var(--mb-gold)' }} />
                <path d="M940 162L330 162C282 162 204 147 116 123" fill="none" strokeWidth="1.6" style={{ stroke: 'var(--mb-gold-light)' }} />
            </g>
            <g fill="#22324f">
                {WINDOWS.map((x) => (
                    <rect key={x} x={x} y="134" width="6.5" height="9" rx="3" />
                ))}
            </g>
            <g fill="none" stroke="#9aa3b2" strokeWidth="1.4">
                {DOORS.map((x) => (
                    <rect key={x} x={x} y="127" width="14" height="33" rx="5" />
                ))}
            </g>
            <path d="M884 131L907 130C915 130 921 134 925 140L887 141Z" fill="#14233c" />
            <path d="M896 130.5L895 141M909 131L907 140.5" stroke="#cfd6e0" strokeWidth="1.3" />

            <path d="M262 150L178 182C174 184 170 185 166 185L150 185C144 185 143 181 147 178L214 146Z" fill={url('wing')} />

            <path d="M626 176C590 192 470 236 392 256C384 258 378 259 373 259L356 259C349 259 347 254 352 250L470 182Z" fill={url('wing')} />
            <path d="M372 259L361 236C359 232 362 230 366 231L380 257Z" style={{ fill: 'var(--mb-gold)' }} />
            <path d="M600 186C560 200 470 232 404 250" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.4" fill="none" />

            <g transform="translate(606 220) scale(1.22) translate(-606 -222)">
                <path d="M560 194L622 190L612 206L556 208Z" fill="#c4cbd6" />
                <path
                    d="M566 203C584 199 622 198 646 201C656 203 661 212 661 222C661 232 656 241 646 243C622 246 584 245 566 241C556 238 551 231 551 222C551 213 556 206 566 203Z"
                    fill={url('nacelle')}
                />
                <path d="M553 213L536 217C532 219 532 225 536 227L553 231Z" fill="#6f7a8c" />
                <ellipse cx="655" cy="222" rx="7" ry="20" fill="#14233c" />
                <ellipse cx="655" cy="222" rx="7" ry="20" fill="none" stroke="#f4f6f9" strokeWidth="2.6" />
                <path d="M566 211C590 208 624 208 646 210" fill="none" strokeWidth="2" style={{ stroke: 'var(--mb-gold)' }} />
            </g>
        </svg>
    )
}
