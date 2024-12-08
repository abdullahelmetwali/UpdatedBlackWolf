"use client";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import { useState } from "react";
import { Product } from "@/interfaces/Types";

const UsrPG: React.FC = () => {
    const [usrCart, setUsrCart] = useState<Product[]>([]);
    const usrData = localStorage?.getItem('u') || null;
    const name = usrData ? JSON.parse(usrData)?.displayName : 'Guest';
    const router = useRouter();
    const logOut: () => Promise<void> =
        async () => {
            try {
                await signOut(auth);
                localStorage.removeItem('u');
                cookies.remove('u');
                router.push('/account/login');
            } catch (err) {
                console.log(err);
            }
        }
    return (
        <section>
            <p className="text-2xl tracking-wide font-semibold">Welcome back, {name} 👋</p>
            <section>
                {
                    usrCart.map((pro: Product, index: number) => (
                        <div key={index}>
                            <p>{pro.title}</p>
                        </div>
                    ))
                }
            </section>
            <button className="py-1 px-5 rounded-xl bg-[#872341]" onClick={logOut} style={{ width: 'fit-content' }}>
                Logout
            </button>
        </section>
    )
}
export default UsrPG;