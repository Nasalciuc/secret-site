import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBlogStore } from '@/store/useBlogStore'
import AirlinesLogos from '@/components/Footer/AirlinesLogos'
import BlackWithOrangeTextButton from '@/components/common/Buttons/BlackWithOrangeTextButton'
import OrangeFilledButton from '@/components/common/Buttons/OrangeFilledButton'

const BACK = import.meta.env.VITE_BACK || ''

const storageUrl = (url) => {
    if (!url) return ''
    if (/^(https?:|data:|blob:)/.test(url) || url.startsWith('/')) return url
    return `${BACK}/storage/${url}`
}

export default function BlogPage() {
    const { blogs, blogsIsLoaded, getBlogs } = useBlogStore()

    useEffect(() => {
        if (!blogsIsLoaded) getBlogs()
    }, [blogsIsLoaded, getBlogs])

    return (
        <>
            <div className="header-content">
                <div className="blog-header">
                    <h1>Business Class Travel Blog</h1>
                    <div className="blog-header-cards">
                        {(blogs || []).slice(0, 5).map((blog) => (
                            <div key={blog.id} className="blog-header-card">
                                <img src={storageUrl(blog.image)} alt={blog.name} loading="lazy" decoding="async" />
                                <h3>{blog.name}</h3>
                                <OrangeFilledButton buttonText="Read more" link={`/blog/${blog.id}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <AirlinesLogos />
            <div className="blog-cards-content">
                {(blogs || []).map((blog) => (
                    <div key={blog.id} className="blog-card">
                        <Link to={`/blog/${blog.id}`} aria-label={`Open ${blog.name}`}>
                            <img src={storageUrl(blog.image)} alt={blog.name} loading="lazy" decoding="async" />
                        </Link>
                        <div className="blog-card-content">
                            <h3>{blog.name}</h3>
                            <p>{blog.description}</p>
                            <BlackWithOrangeTextButton buttonText="Read More" link={`/blog/${blog.id}`} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
