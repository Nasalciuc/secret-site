import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { withBrandTitle } from '@/utils/brandTitle'
import HeaderContainer from '@/components/DynamicPage/HeaderContainer'
import DescriptionVue from '@/components/DynamicPage/DescriptionVue'
import WorksContainer from '@/components/MainPage/WorksContainer'
import BestSelling from '@/components/MainPage/BestSelling'
import ReviewsSection from '@/components/MainPage/ReviewsSection'
import ContactSection from '@/components/MainPage/ContactSection'
import AirlinesLogos from '@/components/Footer/AirlinesLogos'
import Error404 from '@/pages/404Error'
import dynamicPagesData from '@/dynamicPages.json'

export default function DynamicPage() {
    const location = useLocation()
    const { stopQuoteLoading } = useAppStore()
    const pageSlug = location.pathname.replace(/^\//, '').replace(/\/$/, '')
    const page = useMemo(() => dynamicPagesData[pageSlug] || null, [pageSlug])

    useEffect(() => {
        stopQuoteLoading?.()
    }, [stopQuoteLoading])

    useEffect(() => {
        if (!page) return

        if (page.meta?.title) document.title = withBrandTitle(page.meta.title)

        let metaDesc = document.querySelector('meta[name="description"]')
        if (!metaDesc) {
            metaDesc = document.createElement('meta')
            metaDesc.setAttribute('name', 'description')
            document.head.appendChild(metaDesc)
        }
        metaDesc.setAttribute('content', page.meta?.description || '')

        let metaKeywords = document.querySelector('meta[name="keywords"]')
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta')
            metaKeywords.setAttribute('name', 'keywords')
            document.head.appendChild(metaKeywords)
        }
        metaKeywords.setAttribute('content', (page.meta?.keywords || []).join(', '))
    }, [page])

    if (!page) return <Error404 />

    return (
        <div className="main-page mb-page mb-dynamic-page">
            <div className="header-content">
                <HeaderContainer title={page.mainTitle} />
            </div>
            <AirlinesLogos />
            <WorksContainer />
            <BestSelling />
            <ReviewsSection />
            <DescriptionVue title={page.about?.title} text={page.about?.body} />
            <ContactSection />
        </div>
    )
}
