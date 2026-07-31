import { Link } from 'react-router-dom'

/**
 * Mirrors Vue OrangeFilledButton:
 * - with `link` → router Link
 * - without `link` → <button> that runs `click`
 */
export default function OrangeFilledButton({
    buttonText,
    click,
    className = '',
    type = 'button',
    link = '',
}) {
    const rootClass = className
        ? `orange-filled-button button-container ${className}`
        : 'orange-filled-button button-container'

    let content
    if (link) {
        content = <Link to={link}>{buttonText}</Link>
    } else {
        content = (
            <button type={type} onClick={click}>
                {buttonText}
            </button>
        )
    }

    return <div className={rootClass}>{content}</div>
}
