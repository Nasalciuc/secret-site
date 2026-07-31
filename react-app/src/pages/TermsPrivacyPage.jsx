import { createElement, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getPrivacyTerms } from '@/services/api'
import ContactSection from '@/components/MainPage/ContactSection'
import { withBrandTitle } from '@/utils/brandTitle'

const termsPaths = new Set(['/terms', '/terms-and-conditions'])

export default function TermsPrivacyPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const isTerms = termsPaths.has(location.pathname)
    const [body, setBody] = useState([])

    const title = isTerms ? 'Terms and Conditions' : 'Privacy Policy'
    const requestType = isTerms ? 'terms' : 'privacy'

    useEffect(() => {
        document.title = withBrandTitle(title)
    }, [title])

    useEffect(() => {
        let cancelled = false

        const loadContent = async () => {
            const [result, error] = await getPrivacyTerms(requestType)

            if (cancelled) return

            if (error !== null) {
                navigate('/')
                return
            }

            try {
                setBody(JSON.parse(result?.body ?? '[]')?.blocks ?? [])
            } catch {
                setBody([])
            }
        }

        loadContent()

        return () => {
            cancelled = true
        }
    }, [navigate, requestType])

    const blocks = useMemo(() => (Array.isArray(body) ? body : []), [body])

    return (
        <div className="required-page">
            <div className="blocks">
                <div className="title">{title}</div>
                {blocks.map((item, index) => {
                    const type = item?.type
                    const className = `block ${type === 'paragraph' ? 'text' : ''} ${type === 'header' ? 'header' : ''}`.trim()

                    if (type === 'header') {
                        const level = Math.min(Math.max(Number(item?.data?.level) || 2, 1), 6)
                        return (
                            <div className={className} key={item?.id ?? index}>
                                {createElement(`h${level}`, null, item?.data?.text ?? '')}
                            </div>
                        )
                    }

                    return (
                        <div className={className} key={item?.id ?? index}>
                            <p dangerouslySetInnerHTML={{ __html: item?.data?.text ?? '' }} />
                        </div>
                    )
                })}
            </div>
            <ContactSection />
        </div>
    )
}
