import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default function HeaderLayout({ children }) {
    return (
        <div className="header-layout">
            <Header layout="header" />
            {children}
            <Footer />
        </div>
    )
}
