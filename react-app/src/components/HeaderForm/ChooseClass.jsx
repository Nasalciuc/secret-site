const cabinTypes = ['Business Class', 'First Class']

export default function ChooseClass({ type = 'Business Class', onSetType, className = '' }) {
    return (
        <div className={`choose-cabin-type ${className}`}>
            <label>Cabin Type</label>
            <div className="cabin-buttons">
                {cabinTypes.map((cabinType) => (
                    <button
                        key={cabinType}
                        type="button"
                        onClick={() => onSetType?.(cabinType)}
                        className={type === cabinType ? 'active' : ''}
                    >
                        {cabinType}
                    </button>
                ))}
            </div>
        </div>
    )
}
