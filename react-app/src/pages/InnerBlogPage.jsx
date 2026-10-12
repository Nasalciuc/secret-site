import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AirlinesLogos from '@/components/Footer/AirlinesLogos'
import { withBrandTitle } from '@/utils/brandTitle'

const BACK = import.meta.env.VITE_BACK

export default function InnerBlogPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [currentBlog, setCurrentBlog] = useState([])
    const [headerBlog, setHeaderBlog] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const result = await axios.get(`${BACK}/api/articles/getOne`, {
                    params: { id },
                })

                if (result?.data?.responseCode?.responseCode !== '1') {
                    throw new Error('')
                }

                const name = result.data.data.name
                setCurrentBlog(JSON.parse(result.data.data.body).blocks)
                setHeaderBlog({
                    name,
                    imgUrl: `${BACK}/storage/${result.data.data.image}`,
                })
                if (name) document.title = withBrandTitle(name)
                setIsLoaded(true)
            } catch (error) {
                navigate('/')
            }
        }

        fetchBlog()
    }, [id, navigate])

    return (
        <div className="mb-page mb-inner-blog-page">
            <div className="header-content">
                <div className="inner-blog-header">
                    {headerBlog.imgUrl && <img src={headerBlog.imgUrl} alt={headerBlog.name} />}
                    <h1>{headerBlog.name}</h1>
                </div>
            </div>
            {isLoaded && (
                <div className="inner-blog-page" xyz="fade small stagger">
                    <AirlinesLogos />
                    <div className="cards-container">
                        {currentBlog.map((block, index) => {
                            if (block.type === 'header') {
                                const Tag = `h${Math.min(Math.max(Number(block.data?.level) || 2, 1), 6)}`
                                return (
                                    <div key={index} className="blog-block content text-from-editor xyz-in">
                                        <Tag className="header" dangerouslySetInnerHTML={{ __html: block.data?.text ?? '' }} />
                                    </div>
                                )
                            }
                            if (block.type === 'image') {
                                return (
                                    <div key={index} className="blog-block content text-from-editor xyz-in">
                                        <img
                                            src={block.data?.file?.url || block.data?.url}
                                            alt="image"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                )
                            }
                            if (block.type === 'paragraph') {
                                return (
                                    <div key={index} className="blog-block content text-from-editor xyz-in">
                                        <p dangerouslySetInnerHTML={{ __html: block.data?.text ?? '' }} />
                                    </div>
                                )
                            }
                            if (block.type === 'list') {
                                return (
                                    <div key={index} className="blog-block content text-from-editor xyz-in">
                                        <ul>
                                            {(block.data?.items ?? []).map((item, i) => (
                                                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                            ))}
                                        </ul>
                                    </div>
                                )
                            }
                            return null
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
