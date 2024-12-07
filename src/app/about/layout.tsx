import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: 'ABOUT',
    description: 'Step into the realm of timeless sophistication and unleash your wild side with Black Wolf. Discover the power of understated elegance in every stitch, every detail, and every design. Embrace the allure of the night and command attention with our collection that speaks volumes without saying a word. Black Wolf - Where Confidence Reigns Supreme. Elevate your style with our collection that epitomizes strength, passion, and unyielding resolve. Embrace the darkness and conquer the day with Black Wolf by your side.'
};

const AboutLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="py-16 my-14 px-3">
            {children}
        </main>
    )
}

export default AboutLayout;