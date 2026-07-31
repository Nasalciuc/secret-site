import Header from '@/components/Header/Header'

// Footer is rendered globally in App.jsx after the router; rendering it here
// again produced a double footer on HeaderLayout pages.
export default function HeaderLayout({ children }) {
    return (
        <div className="header-layout">
            <Header layout="header" />
            {children}
        </div>
    )
}
