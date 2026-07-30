const labels = {
    adult: 'Adults',
    child: 'Childrens',
    infant: 'Infants',
}

export default function ChoosePassengers({ travelers = { adult: 1, child: 0, infant: 0 }, onSetTravelers, className = '' }) {
    const updateTravelers = (type, delta) => {
        const nextValue = travelers[type] + delta

        if (type === 'adult' && nextValue < 1) return
        if (type !== 'adult' && nextValue < 0) return
        if (nextValue > 9) return

        onSetTravelers?.({
            ...travelers,
            [type]: nextValue,
        })
    }

    return (
        <div className={`choose-ammount-travelers ${className}`}>
            <label>Travelers</label>
            {Object.keys(labels).map((type) => (
                <div className="travelers-buttons" key={type}>
                    <span className="adults">{labels[type]}</span>
                    <div className="right-block">
                        <button className="control minus" type="button" onClick={() => updateTravelers(type, -1)}>
                            -
                        </button>
                        <span className="ammount">{travelers[type]}</span>
                        <button className="control plus" type="button" onClick={() => updateTravelers(type, 1)}>
                            +
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
