import SvgContainer from '@/components/Header/SvgContainer'
import secure3dImg from '@/assets/images/static/3d-secure.jpeg'

export default function IconsBlock() {
    return (
        <div className="footer-container about-icons-footer">
            <div className="icons-block">
                <div className="services-logo">
                    <SvgContainer />
                </div>
                <img
                    width="50"
                    height="50"
                    className="secure-3d"
                    src={secure3dImg}
                    alt="3d secure"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </div>
    )
}
