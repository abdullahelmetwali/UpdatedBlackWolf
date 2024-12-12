import Link from "next/link"
import { ShoppingCart } from 'lucide-react';

const EmptyCart: React.FC = () => {
    return (
        <div className="relative flex justify-center items-center w-full flex-col">
            <div className="bg-[#0f0f0f] h-32 w-full text-center text-xl py-5">
                <p className="text-xl">Your cart is empty.</p>
            </div>
            <div className="bg-black absolute top-20 h-28 w-28 p-6 rounded-full flex justify-center items-center">
                <ShoppingCart color="#a1a1a1" width={40} height={40} />
            </div>
            <div className="py-28 tracking-widest text-center">
                <Link href={`/category/all`} className="opacity-50 hover:opacity-100">CONTINUE BROWSING</Link>
            </div>
        </div>
    )
};
export default EmptyCart;