import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="flex justify-between items-start gap-10 tab:flex-col py-8 px-4">
            <div>
                <p className="text-2xl font-black tracking-wider my-3 text-nowrap whitespace-nowrap">BLACK WOLF</p>
                <p className="text-xl mb-4">QUICK LINKS</p>
                <ul className="text-xl">
                    <li>
                        <Link href={`/`} className="opacity-70 hover:opacity-100">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href={`/about`} className="opacity-70 hover:opacity-100">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href={`/category/all`} className="opacity-70 hover:opacity-100">
                            Category
                        </Link>
                    </li>
                    <li>
                        <Link href={`/account`} className="opacity-70 hover:opacity-100">
                            Account
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <p className="text-xl font-black tracking-wide my-3">DRESS LIKE A BOSS</p>
                <p className="mb-4 w-[23rem] tab:w-auto">
                    We create luxurious, comfortable and multifunctional
                    streetwear, with an ecological conscience. So you
                    can feel sophisticated without sacrifing style, ethics, or
                    the enviroment.
                </p>
                <a href={`#`} className="opacity-70 hover:opacity-100">
                    45 Marine Parade
                </a><br />
                <a href={`#`} className="opacity-70 hover:opacity-100">
                    Coolangatta QLD 42
                </a><br />
                <a href="tel:000000000" className="opacity-70 hover:opacity-100">
                    +61 7 5599 6777 1
                </a>
            </div>
            <div>
                <Image
                    src={`/imgs/FooterPoster2.jpg`}
                    alt="ROOM"
                    title="ROOM"
                    width={700}
                    height={350}
                    style={{
                        filter: 'brightness(.7) grayscale(1) contrast(.9)',
                    }}
                />
                <div className="my-6 tracking-wide">
                    <p>
                        NEWSLETTER
                    </p>
                    <p className="text-sm">
                        Sign up to be upto new news
                    </p>
                    <form action="#">
                        <input type="email" placeholder="youremail@example.com" className="box" />
                    </form>
                </div>
            </div>
        </footer>
    )
}
export default Footer;