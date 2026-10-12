import { useEffect } from 'react'
import FaqSection, { getFaqSchema } from '@/components/MainPage/FaqSection'

export default function FaqPage() {
    useEffect(() => {
        const url = 'https://buybusinessclass.com/faq'
        let link = document.querySelector('link[rel="canonical"]')
        const previousCanonical = link?.getAttribute('href') || ''
        const createdCanonical = !link

        if (!link) {
            link = document.createElement('link')
            link.rel = 'canonical'
            document.head.appendChild(link)
        }

        link.href = url

        const existing = document.getElementById('faq-schema')
        if (existing) existing.remove()
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'faq-schema'
        script.text = JSON.stringify(getFaqSchema())
        document.head.appendChild(script)

        return () => {
            if (createdCanonical) link.remove()
            else link.href = previousCanonical || url

            const existing = document.getElementById('faq-schema')
            if (existing) existing.remove()
        }
    }, [])

    return (
        <div className="faq-page mb-page">
            <div className="mb-cl-hero">
                <h1 className="mb-serif">Frequently asked questions</h1>
            </div>
            <FaqSection limit={null} showMoreLink={false} />
        </div>
    )
}
