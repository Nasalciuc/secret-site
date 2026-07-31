import IconsBlock from './IconsBlock'

export default function FirstBlock() {
    return (
        <div className="xyz-in" xyz="fade duration-15 delay-5">
            <section className="mb-about-hero">
                <span className="mb-eyebrow">Premium travel experts</span>
                <h1 className="mb-serif mb-about-hero__title">
                    About <span className="accent">Buy Business Class</span>
                </h1>
                <h2 className="mb-about-hero__subtitle">Elevate Your Travel Experience</h2>
                <p className="mb-about-hero__text">
                    At Buy Business Class, we don't just book flights, we create tailored, premium travel experiences.
                    Whether you're a business professional seeking efficiency or a luxury traveler looking for comfort,
                    we specialize in providing Business and First Class tickets with exclusive savings. Our mission is
                    simple: to make luxury air travel accessible, seamless, and cost-effective, offering cheap business
                    class tickets without compromising on quality.
                </p>
            </section>

            <IconsBlock />
        </div>
    )
}
