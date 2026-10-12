import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { useRegionStore } from '@/store/useRegionStore'
import { HOME_SECTIONS } from '@/components/Header/Header'

const TRANSITION = parseInt(import.meta.env.VITE_TRANSITION || '400')

export default function BurgerMenu() {
    const { burgherMenu, setBurgherMenu, settings } = useAppStore()
    const { regions, regionsIsLoaded, getRegions } = useRegionStore()
    const [setTransition, setSetTransition] = useState(false)

    useEffect(() => {
        if (!regionsIsLoaded) getRegions()
    }, [getRegions, regionsIsLoaded])

    useEffect(() => {
        if (burgherMenu) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        setSetTransition(true)
        const timer = setTimeout(() => setSetTransition(false), TRANSITION)
        return () => clearTimeout(timer)
    }, [burgherMenu])

    const hideBurgher = () => setBurgherMenu(false)

    // React store keeps `regions` as a flat array (Vue nested under regions.regions).
    const firstRegion = Array.isArray(regions) ? regions[0] : regions?.regions?.[0]
    const bestDealsTo = firstRegion?.name
        ? `/best-deals/${String(firstRegion.name).toLowerCase()}/${firstRegion.id ?? 0}`
        : regionsIsLoaded
          ? '/best-deals/unset/0'
          : '#'

    return (
        <div className={`burgher-menu ${burgherMenu ? 'show' : 'hide'} ${setTransition ? 'transition' : ''}`}>
            <div className="burgher-header">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.9289 31.9211C20.5139 31.9211 24.6707 30.0014 27.5899 26.8759L1.87216 23.4807C4.58519 28.4784 9.83652 31.9211 15.9289 31.9211ZM15.9289 0C13.0413 0 10.3284 0.777347 7.98036 2.12594C12.2956 2.83992 15.2149 6.02883 18.1183 9.53505C14.739 7.02844 11.0899 6.25109 7.29806 5.77505C6.88555 5.72752 6.3143 5.45774 6.15588 5.15628C5.94947 4.72792 5.77505 4.26772 5.61632 3.80768C2.17362 6.72697 0 11.0741 0 15.9289C0 17.5948 0.253782 19.213 0.729822 20.7678H31.1438C31.6196 19.2605 31.8736 17.6423 31.8736 15.9289C31.9211 7.13949 24.7341 0 15.9289 0ZM14.1202 18.753C12.8669 18.753 11.677 18.1817 11.1057 17.0394C9.63026 14.1202 8.32935 11.0899 6.8697 7.91683C11.5024 7.91683 15.6749 8.32935 19.0543 11.1533C21.815 13.4379 26.9711 18.8163 26.9711 18.8163L14.1202 18.753Z"
                        fill="white"
                    />
                </svg>
                <button aria-label="toggle menu" onClick={() => setBurgherMenu(!burgherMenu)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.70708 5.29289C6.31655 4.90237 5.68339 4.90237 5.29286 5.29289C4.90234 5.68342 4.90234 6.31658 5.29286 6.70711L10.5857 12L5.29277 17.2929C4.90225 17.6834 4.90225 18.3166 5.29277 18.7071C5.6833 19.0976 6.31646 19.0976 6.70698 18.7071L11.9999 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4141 12L18.707 6.70711C19.0975 6.31658 19.0975 5.68342 18.707 5.29289C18.3165 4.90237 17.6833 4.90237 17.2928 5.29289L11.9999 10.5857L6.70708 5.29289Z"
                            fill="#6F767E"
                        />
                    </svg>
                </button>
            </div>
            <div className="content">
                <div className="links">
                    {HOME_SECTIONS.map((section, index) => (
                        <Link key={section.id} onClick={hideBurgher} to={{ pathname: '/', hash: `#${section.id}` }} className="fade-in" style={{ '--index': index }}>
                            {section.label}
                        </Link>
                    ))}
                    <span className="links-divider" aria-hidden="true" />
                    <Link onClick={hideBurgher} to="/about-us" className="fade-in" style={{ '--index': 4 }}>About Us</Link>
                    <Link onClick={hideBurgher} to="/airlines" className="fade-in" style={{ '--index': 4 }}>Airlines</Link>
                    <Link onClick={hideBurgher} to="/business-class-flights" className="fade-in" style={{ '--index': 5 }}>Business Class Flights</Link>
                    <Link onClick={hideBurgher} to={bestDealsTo} className="fade-in" style={{ '--index': 5 }}>Best Deals</Link>
                    <a href="https://blog.buybusinessclass.com/" className="fade-in" style={{ '--index': 6 }}>Blog</a>
                </div>
                <div className="footer fade-in" style={{ '--index': 6 }}>
                    <p>24/7 SERVICE</p>
                    <a className="tel" href={`tel:${settings?.number}`}>{settings?.number}</a>
                </div>
            </div>
        </div>
    )
}
