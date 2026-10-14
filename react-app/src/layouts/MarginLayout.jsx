import { useLocation } from 'react-router-dom'
import Header from '@/components/Header/Header'
import { useAppStore } from '@/store/useAppStore'

export default function MarginLayout({ children }) {
    const quoteLoading = useAppStore((s) => s.quoteLoading)
    // The homepage runs its bar and hero edge to edge (moodboard); inner pages keep the frame.
    const isHome = useLocation().pathname === '/'

    return (
        <div className={`margin-container margin-layout${isHome ? ' is-home' : ''}${quoteLoading?.loading ? ' hide-bars' : ''}`}>
            <Header layout="margin" />
            {children}
        </div>
    )
}
