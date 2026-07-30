import IconsBlock from './IconsBlock'

export default function FirstBlock() {
    return (
        <div className="xyz-in" xyz="fade left-50% duration-15 delay-5">
            <div className="flight-description-new">
                <div className="title">
                    <h1 className="main-title" style={{ fontFamily: 'SSP-bold' }}>
                        About Buy Business Class
                    </h1>
                </div>
                <div className="title">
                    <h2 className="main-title">
                        <span className="capitalize" style={{ fontSize: '24px' }}>
                            Elevate Your Travel Experience
                        </span>
                    </h2>
                </div>

                <p className="content" style={{ textAlign: 'center' }}>
                    At Buy Business Class, we don't just book flights, we create tailored, premium travel experiences.
                    Whether you're a business professional seeking efficiency or a luxury traveler looking for comfort,
                    we specialize in providing Business and First Class tickets with exclusive savings. Our mission is
                    simple: to make luxury air travel accessible, seamless, and cost-effective, offering cheap business
                    class tickets without compromising on quality.
                </p>
            </div>

            <IconsBlock />
        </div>
    )
}
