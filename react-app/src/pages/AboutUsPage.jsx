import { useEffect } from 'react'
import BottomBlock from '@/components/AboutUs/BottomBlock'
import FirstBlock from '@/components/AboutUs/FirstBlock'
import SecondBlock from '@/components/AboutUs/SecondBlock'
import ThirdBlock from '@/components/AboutUs/ThirdBlock'

export default function AboutUsPage() {
    useEffect(() => {
        const link = document.createElement('link')
        link.rel = 'canonical'
        link.href = 'https://buybusinessclass.com/about-us'
        document.head.appendChild(link)
        return () => document.head.removeChild(link)
    }, [])

    return (
        <div>
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />
            <BottomBlock />
        </div>
    )
}
