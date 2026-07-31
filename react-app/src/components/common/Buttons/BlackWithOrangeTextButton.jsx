import { Link } from 'react-router-dom'

/**
 * Mirrors Vue BlackWithOrangeTextButton:
 * - with `link` → router Link (or plain <a> if regularLink)
 * - without `link` → <button> that runs `click`
 */
export default function BlackWithOrangeTextButton({
    buttonText,
    click,
    link = '',
    regularLink = false,
    className = '',
    ...rest
}) {
    const rootClass = className
        ? `black-orange-button ${className}`
        : 'black-orange-button'

    let content
    if (link && regularLink) {
        content = <a href={link}>{buttonText}</a>
    } else if (link) {
        content = <Link to={link}>{buttonText}</Link>
    } else {
        content = (
            <button type="button" onClick={click}>
                {buttonText}
            </button>
        )
    }

    return (
        <div className={rootClass} {...rest}>
            {content}
        </div>
    )
}
