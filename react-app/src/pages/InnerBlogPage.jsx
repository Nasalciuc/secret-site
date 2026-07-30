import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AirlinesLogos from '@/components/Footer/AirlinesLogos'

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

                setCurrentBlog(JSON.parse(result.data.data.body).blocks)
                setHeaderBlog({
                    name: result.data.data.name,
                    imgUrl: `${BACK}/storage/${result.data.data.image}`,
                })
                setIsLoaded(true)
            } catch (error) {
                navigate('/')
            }
        }

        fetchBlog()
    }, [id, navigate])

    return (
        <>
            <div className="header-content">
                <div className="inner-blog-header">
                    {headerBlog.imgUrl && <img src={headerBlog.imgUrl} alt={headerBlog.name} />}
                    <h1>{headerBlog.name}</h1>
                </div>
            </div>
            {isLoaded && (
                <div className="inner-blog-page">
                    <AirlinesLogos />
                    <div className="cards-container">
                        {currentBlog.map((block, index) => (
                            <div key={index} className="blog-block">
                                {block.type === 'paragraph' && <p>{block.data.text}</p>}
                                {block.type === 'header' && <h2>{block.data.text}</h2>}
                                {block.type === 'image' && <img src={block.data.url} alt="" />}
                                {block.type === 'list' && (
                                    <ul>
                                        {block.data.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
