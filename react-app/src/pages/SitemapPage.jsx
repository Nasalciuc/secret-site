import { useEffect } from 'react'

export default function SitemapPage() {
    useEffect(() => {
        window.location.replace('/sitemap.html')
    }, [])

    return (
        <div className="sitemap-page mb-page">
            <p>Redirecting&hellip;</p>
        </div>
    )
}
