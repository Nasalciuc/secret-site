import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import BlackWithOrangeTextButton from '@/components/common/Buttons/BlackWithOrangeTextButton'

export default function WorksContainer() {
    const location = useLocation()
    const { appWidth } = useAppStore()
    const [displayPlaneAdaptive, setDisplayPlaneAdaptive] = useState(false)
    const [visible, setVisible] = useState(false)
    const rootRef = useRef(null)
    // Match Vue: `$route.fullPath === '/' ? '' : '/'`
    const isHome = `${location.pathname}${location.search}${location.hash}` === '/'

    useEffect(() => {
        setDisplayPlaneAdaptive(appWidth <= 420)
    }, [appWidth])

    useEffect(() => {
        const el = rootRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.2 },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const xyzIn = visible ? ' xyz-in' : ''

    return (
        <div className="describe-container" ref={rootRef}>
            <div className="title">
                <p className="main-title">How does this <span>work?</span></p>
            </div>
            <div className="steps">
                <div className={`first-step${xyzIn}`} xyz="fade left-50%">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7 11C7 10.4477 7.44772 10 8 10H16C16.5523 10 17 10.4477 17 11C17 11.5523 16.5523 12 16 12H8C7.44772 12 7 11.5523 7 11Z" fill="#6F767E" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M7 15C7 14.4477 7.44772 14 8 14H12C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16H8C7.44772 16 7 15.5523 7 15Z" fill="#6F767E" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M21 19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H16L16.0107 2.01071C16.7136 2.07025 17.3761 2.3761 17.8787 2.87868L20.1213 5.12132C20.6239 5.6239 20.9297 6.28645 20.9893 6.98929L21 7V19ZM18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44771 4 6 4H15V6C15 7.10457 15.8954 8 17 8H19V19C19 19.5523 18.5523 20 18 20Z" fill="#6F767E" />
                    </svg>
                    <div className="info">
                        <p className="step-title">Request a quote</p>
                        <p className="step-body">Request a FREE quote by completing the form above.</p>
                    </div>
                    <svg width="58" height="101" viewBox="0 0 58 101" fill="none" xmlns="http://www.w3.org/2000/svg" className="number">
                        <path d="M57.5036 101H0.191625V95.816L8.97563 92.36C15.5996 89.624 17.3276 87.752 17.3276 82.136V31.592C17.3276 26.408 14.1596 23.096 8.25563 21.944L0.191625 20.36V15.464L35.7596 0.919992L40.2236 3.8V82.136C40.2236 87.608 42.3836 89.768 48.7196 92.36L57.5036 95.816V101Z" fill="#1A1D1F" />
                    </svg>
                </div>
                <div className={`second-step${xyzIn}`} xyz="fade right-50% delay-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 4C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V12C19 11.4477 19.4477 11 20 11C20.5523 11 21 11.4477 21 12V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H12C12.5523 2 13 2.44772 13 3C13 3.55228 12.5523 4 12 4H6Z" fill="#6F767E" />
                        <path d="M19.4958 3.76739C18.5195 2.79108 16.9366 2.79108 15.9602 3.76739L15.2531 4.4745C15.0579 4.66976 15.0579 4.98634 15.2531 5.1816L18.7887 8.71714C18.9839 8.9124 19.3005 8.9124 19.4958 8.71714L20.2029 8.01003C21.1792 7.03372 21.1792 5.45081 20.2029 4.4745L19.4958 3.76739Z" fill="#6F767E" />
                        <path d="M13.8389 6.59582C13.6436 6.40056 13.327 6.40056 13.1318 6.59582L8.06419 11.6634C7.91119 11.8164 7.81194 12.0149 7.78134 12.2291L7.30994 15.5289C7.21566 16.1889 7.78134 16.7546 8.44131 16.6603L11.7411 16.1889C11.9553 16.1583 12.1538 16.0591 12.3068 15.9061L17.3744 10.8385C17.5697 10.6432 17.5697 10.3266 17.3744 10.1314L13.8389 6.59582Z" fill="#6F767E" />
                    </svg>
                    <div className="info">
                        <p className="step-title">Fill in your information</p>
                        <p className="step-body">Fill in your personal and contact information.</p>
                    </div>
                    <svg width="71" height="101" viewBox="0 0 71 101" fill="none" xmlns="http://www.w3.org/2000/svg" className="number">
                        <path d="M66.8924 101H1.94838L0.508375 93.512C15.1964 77.24 26.8604 62.264 33.6284 51.176C37.2284 45.272 39.8204 37.064 39.8204 31.592C39.8204 22.232 34.0604 16.328 24.9884 16.328C19.2284 16.328 13.1804 18.632 5.40438 23.672L0.796375 17.48C9.86838 6.82399 21.8204 0.919992 33.7724 0.919992C52.6364 0.919992 65.5964 12.008 65.5964 28.424C65.5964 38.216 59.8364 49.304 49.3244 59.816C41.5484 67.592 31.0364 76.376 23.8364 82.136H51.0524C55.0844 82.136 57.6764 80.984 60.8444 76.664L65.1644 70.904H70.4924L66.8924 101Z" fill="#1A1D1F" />
                    </svg>
                </div>
                <div className={`third-step${xyzIn}`} xyz="fade left-50% delay-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                        <path fillRule="evenodd" clipRule="evenodd" d="M20.6811 13.243C21.3004 12.6238 21.6181 11.7648 21.5509 10.8916L21.1469 5.63883C21.0334 4.16349 19.8612 2.99124 18.3858 2.87775L13.133 2.47369C12.2598 2.40652 11.4009 2.72427 10.7816 3.34353L3.272 10.8531C2.10043 12.0247 2.10042 13.9242 3.272 15.0958L8.92885 20.7526C10.1004 21.9242 11.9999 21.9242 13.1715 20.7526L20.6811 13.243ZM14.5858 7.31763C14.0001 7.90342 14.0001 8.85317 14.5858 9.43895C15.1716 10.0247 16.1214 10.0247 16.7072 9.43895C17.2929 8.85317 17.2929 7.90342 16.7072 7.31763C16.1214 6.73185 15.1716 6.73185 14.5858 7.31763ZM10.3433 16.51L7.51485 13.6816C7.12433 13.2911 7.12433 12.6579 7.51485 12.2674C7.90538 11.8769 8.53854 11.8769 8.92907 12.2674L11.7575 15.0958C12.148 15.4863 12.148 16.1195 11.7575 16.51C11.367 16.9005 10.7338 16.9005 10.3433 16.51Z" fill="#6F767E" />
                    </svg>
                    <div className="info">
                        <p className="step-title">Find the best deal</p>
                        <p className="step-body">A friendly travel concierge will quicky find the best deals for you.</p>
                    </div>
                    <svg width="71" height="103" viewBox="0 0 71 103" fill="none" xmlns="http://www.w3.org/2000/svg" className="number">
                        <path d="M32.3075 102.44C20.2115 102.44 9.2675 98.696 0.9155 91.64L5.3795 84.872C11.8595 87.752 19.6355 89.48 26.2595 89.48C37.7795 89.48 44.9795 82.856 44.9795 72.488C44.9795 60.536 35.9075 54.344 19.7795 54.344L18.6275 46.136C34.4675 44.696 42.3875 38.792 42.3875 28.28C42.3875 20.648 37.2035 15.608 29.2835 15.608C22.9475 15.608 16.1795 18.344 7.8275 24.392L3.0755 18.056C12.1475 7.256 24.5315 0.919992 36.6275 0.919992C55.4915 0.919992 68.1635 11.432 68.1635 26.84C68.1635 36.632 62.1155 44.408 50.7395 49.304C63.4115 54.056 70.8995 62.552 70.8995 73.352C70.8995 90.488 54.9155 102.44 32.3075 102.44Z" fill="#1A1D1F" />
                    </svg>
                </div>
                <div className={`fourth-step${xyzIn}`} xyz="fade right-50% delay-9">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7 2C5.34315 2 4 3.34315 4 5V19C4 21.0601 6.35191 22.2361 8 21L11.7 18.225C11.8778 18.0917 12.1222 18.0917 12.3 18.225L16 21C17.6481 22.2361 20 21.0601 20 19V5C20 3.34315 18.6569 2 17 2H7ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8H15C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6H9Z" fill="#6F767E" />
                    </svg>
                    <div className="info">
                        <p className="step-title">Book your flight</p>
                        <p className="step-body">Book your flight and save up to 60% OFF retail prices.</p>
                    </div>
                    <svg width="81" height="99" viewBox="0 0 81 99" fill="none" xmlns="http://www.w3.org/2000/svg" className="number">
                        <path d="M79.8208 99H32.5888V93.816L37.1968 91.368C43.1008 88.2 44.6848 86.04 44.6848 81.72V76.68H1.48475L0.04475 70.344L44.6848 0.359991H67.5808V65.16H80.2528V76.68H67.5808V81.72C67.5808 86.04 69.3088 88.056 75.2128 91.368L79.8208 93.816V99ZM44.6848 18.504L15.8848 65.16H44.6848V18.504Z" fill="#1A1D1F" />
                    </svg>
                </div>
                <div className="plane">
                    {!displayPlaneAdaptive ? (
                        <svg width="903" height="197" viewBox="0 0 903 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 196L69.8171 152.598C140.354 108.112 220.058 80.196 302.938 70.9491L315.332 69.5662C383.687 61.9399 452.881 68.7075 518.462 89.4337L559.96 102.549C606.66 117.308 656.184 120.83 704.502 112.831V112.831C755.369 104.409 803.344 83.4753 844.113 51.9122L875 28" stroke="#33383F" strokeLinejoin="round" strokeDasharray="8 8" />
                            <g clipPath="url(#clip0_55_1020)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M882.161 7.40377L883.408 6.15648C884.078 5.4869 885.068 5.25309 885.967 5.55254L891.632 7.44109C891.812 7.50098 892.01 7.45422 892.144 7.32031L894.536 4.92889C895.512 3.95258 897.095 3.95258 898.071 4.92889C899.047 5.90521 899.047 7.48812 898.071 8.46443L895.68 10.8558C895.546 10.9898 895.499 11.1878 895.559 11.3675L897.447 17.0332C897.747 17.9315 897.513 18.9219 896.843 19.5915L895.596 20.8388C895.484 20.9508 895.326 21.0031 895.169 20.9798C895.012 20.9565 894.876 20.8603 894.801 20.7205L891.835 15.1568C891.756 15.0087 891.557 14.9789 891.438 15.0977L889.586 16.9497C889.475 17.061 889.422 17.2182 889.444 17.374L889.657 18.8589C889.723 19.3263 889.566 19.7978 889.232 20.1317L887.464 21.8995C887.342 22.022 887.165 22.0723 886.996 22.0325C886.827 21.9927 886.691 21.8684 886.637 21.704L885.301 17.6985L881.296 16.3634C881.132 16.3086 881.007 16.1726 880.967 16.0039C880.928 15.8353 880.978 15.658 881.101 15.5355L882.868 13.7677C883.202 13.4339 883.674 13.2767 884.141 13.3435L885.626 13.5556C885.782 13.5779 885.939 13.5255 886.05 13.4142L887.902 11.5621C888.021 11.4434 887.991 11.2437 887.843 11.1647L882.279 8.19853C882.14 8.124 882.044 7.98764 882.02 7.83095C881.997 7.67426 882.049 7.51579 882.161 7.40377Z" fill="#33383F" />
                            </g>
                            <defs>
                                <clipPath id="clip0_55_1020">
                                    <rect width="24" height="24" fill="white" transform="translate(879)" />
                                </clipPath>
                            </defs>
                        </svg>
                    ) : (
                        <svg width="291" height="656" viewBox="0 0 291 656" fill="none" xmlns="http://www.w3.org/2000/svg" className="adaptive">
                            <path d="M1 656V564C1 537.49 22.4903 516 49 516H231C257.51 516 279 494.51 279 468V380C279 353.49 257.51 332 231 332H49C22.4903 332 1 310.51 1 284V220C1 193.49 22.4903 172 49 172H231C257.51 172 279 150.51 279 124V32" stroke="#33383F" strokeLinejoin="round" strokeDasharray="8 8" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M269.5 15L269.5 13.2361C269.5 12.2891 270.035 11.4235 270.882 11L276.224 8.32918C276.393 8.24448 276.5 8.07135 276.5 7.88197L276.5 4.5C276.5 3.11929 277.619 2 279 2C280.381 2 281.5 3.11929 281.5 4.5L281.5 7.88197C281.5 8.07135 281.607 8.24448 281.776 8.32918L287.118 11C287.965 11.4235 288.5 12.2891 288.5 13.2361L288.5 15C288.5 15.1584 288.425 15.3075 288.298 15.4018C288.17 15.4961 288.006 15.5245 287.854 15.4783L281.823 13.6416C281.662 13.5927 281.5 13.7129 281.5 13.8808L281.5 16.5C281.5 16.6574 281.574 16.8056 281.7 16.9L282.9 17.8C283.278 18.0833 283.5 18.5279 283.5 19L283.5 21.5C283.5 21.6733 283.41 21.8342 283.263 21.9253C283.115 22.0164 282.931 22.0247 282.776 21.9472L279 20.059L275.224 21.9472C275.069 22.0247 274.885 22.0164 274.737 21.9253C274.59 21.8342 274.5 21.6733 274.5 21.5L274.5 19C274.5 18.5279 274.722 18.0833 275.1 17.8L276.3 16.9C276.426 16.8056 276.5 16.6574 276.5 16.5L276.5 13.8808C276.5 13.7129 276.338 13.5927 276.177 13.6416L270.146 15.4783C269.994 15.5245 269.83 15.4961 269.702 15.4018C269.575 15.3075 269.5 15.1584 269.5 15Z" fill="#33383F" />
                        </svg>
                    )}
                </div>
            </div>
            <BlackWithOrangeTextButton
                buttonText="Book your Flight Now"
                link={isHome ? '' : '/'}
                click={scrollToTop}
            />
        </div>
    )
}
