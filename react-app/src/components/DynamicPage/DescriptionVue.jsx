export default function DescriptionVue({ title = '', text = '' }) {
    if (!text) return null

    return (
        <div className="flight-description">
            <div className="title">
                <div className="main-title">
                    <span>{title}</span>
                </div>
            </div>
            <p className="content">{text}</p>
        </div>
    )
}
