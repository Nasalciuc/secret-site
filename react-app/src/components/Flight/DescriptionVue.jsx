import { useParams } from 'react-router-dom'

const renderBlock = (block, index) => {
    const data = block?.data ?? {}

    if (block?.type === 'header') {
        const Tag = `h${Math.min(Math.max(Number(data.level) || 3, 2), 6)}`
        return <Tag key={block.id ?? index} dangerouslySetInnerHTML={{ __html: data.text ?? '' }} />
    }

    if (block?.type === 'list') {
        const Tag = data.style === 'ordered' ? 'ol' : 'ul'
        return (
            <Tag key={block.id ?? index}>
                {(data.items ?? []).map((item, itemIndex) => (
                    <li key={`${block.id ?? index}-${itemIndex}`} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
            </Tag>
        )
    }

    if (block?.type === 'quote') {
        return <blockquote key={block.id ?? index} dangerouslySetInnerHTML={{ __html: data.text ?? '' }} />
    }

    if (block?.type === 'image') {
        const src = data.file?.url || data.url
        if (!src) return null
        return (
            <img
                key={block.id ?? index}
                src={src}
                alt="image"
                loading="lazy"
                decoding="async"
            />
        )
    }

    if (block?.type === 'paragraph') {
        return <p key={block?.id ?? index} dangerouslySetInnerHTML={{ __html: data.text ?? '' }} />
    }

    return <p key={block?.id ?? index} dangerouslySetInnerHTML={{ __html: data.text ?? '' }} />
}

export default function DescriptionVue({ text = null }) {
    const params = useParams()
    const destination = params.city || params.country || params.region

    if (text === null) return null

    return (
        <div className="flight-description">
            <div className="title">
                <h2 className="main-title">
                    Business Class Flights to
                    <span className="capitalize">{destination}</span>
                </h2>
            </div>
            <div className="content">
                {Array.isArray(text) ? text.map(renderBlock) : <p dangerouslySetInnerHTML={{ __html: text }} />}
            </div>
        </div>
    )
}
