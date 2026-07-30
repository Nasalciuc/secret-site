import { useEffect } from 'react'

export default function SitemapPage() {
    useEffect(() => {
        window.location.replace('/sitemap.html')
    }, [])

    return null
}
