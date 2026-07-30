export default function OrangeFilledButton({ buttonText, click, className = '', type = 'button' }) {
    return (
        <div className={`orange-filled-button button-container ${className}`}>
            <button type={type} onClick={click}>
                {buttonText}
            </button>
        </div>
    )
}
