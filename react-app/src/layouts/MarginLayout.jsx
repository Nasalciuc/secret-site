import Header from '@/components/Header/Header'
import { useAppStore } from '@/store/useAppStore'

export default function MarginLayout({ children }) {
    const quoteLoading = useAppStore((s) => s.quoteLoading)

    return (
        <div className={`margin-container margin-layout${quoteLoading?.loading ? ' hide-bars' : ''}`}>
            <Header layout="margin" />
            {children}
        </div>
    )
}
