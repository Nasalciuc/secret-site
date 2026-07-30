import { Link } from 'react-router-dom'

export default function TransparentButton({
    buttonText,
    click,
    className = '',
    type = 'button',
    link = '',
    regularLink = false,
    target = '',
}) {
    return (
        <div className={`transparent-button button-container ${className}`}>
            {link && regularLink ? (
                <a href={link} target={target || undefined} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
                    {buttonText}
                </a>
            ) : link ? (
                <Link to={link}>{buttonText}</Link>
            ) : (
                <button type={type} onClick={click}>
                    {buttonText}
                </button>
            )}
        </div>
    )
}
