import { useEffect } from 'react'
import BottomBlock from '@/components/AboutUs/BottomBlock'
import FirstBlock from '@/components/AboutUs/FirstBlock'
import SecondBlock from '@/components/AboutUs/SecondBlock'
import ThirdBlock from '@/components/AboutUs/ThirdBlock'

export default function AboutUsPage() {
    useEffect(() => {
        let link = document.querySelector('link[rel="canonical"]')
        let created = false
        if (!link) {
            link = document.createElement('link')
            link.rel = 'canonical'
            document.head.appendChild(link)
            created = true
        }
        link.href = 'https://buybusinessclass.com/about-us'
        return () => {
            if (created) link?.remove()
        }
    }, [])

    return (
        <div className="mb-page mb-about">
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />
            <BottomBlock />
        </div>
    )
}
