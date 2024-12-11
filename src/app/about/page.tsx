import Image from "next/image";
const AboutPG = () => {
    return (
        <>
            <section className="grid grid-cols-2 justify-items-center px-8 gap-8 tab:grid-cols-1 tab:px-0">
                <div className="text-center">
                    <p className="text-xl font-semibold tracking-widest uppercase">Where Boldness Meets Elegance</p>
                    <article className="text-muted my-3">
                        Step into the realm of timeless sophistication and unleash your wild side with Black Wolf. Discover the power of understated elegance in every stitch, every detail, and every design. Embrace the allure of the night and command attention with our collection that speaks volumes without saying a word.
                    </article>
                </div>
                <div>
                    <Image
                        src={`/imgs/AboutOne.jpg`}
                        alt="Boldness"
                        title="Boldness"
                        width={800}
                        height={400}
                    />
                </div>
            </section>
            <section className="grid grid-cols-2 justify-items-center px-8 gap-8 tab:flex tab:flex-col-reverse tab:px-0 my-12">
                <div>
                    <Image
                        src={`/imgs/AboutTwo.jpg`}
                        alt="Boldness"
                        title="Boldness"
                        width={800}
                        height={400}
                    />
                </div>
                <div className="text-center">
                    <p className="text-xl font-semibold tracking-widest uppercase">Dare to Dominate the Shadows</p>
                    <article className="text-muted my-3">
                        Black Wolf - Where Confidence Reigns Supreme. Elevate your style with our collection that epitomizes strength, passion, and unyielding resolve. Embrace the darkness and conquer the day with Black Wolf by your side.
                    </article>
                </div>
            </section>
        </>
    )
}
export default AboutPG;