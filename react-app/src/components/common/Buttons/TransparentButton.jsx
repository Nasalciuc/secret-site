export default function TransparentButton({ buttonText, click, className = '', type = 'button' }) {
    return (
        <div className={`transparent-button button-container ${className}`}>
            <button type={type} onClick={click}>
                {buttonText}
            </button>
        </div>
    )
}
