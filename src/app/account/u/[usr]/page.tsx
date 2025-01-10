"use client";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import Cart from "@/components/cart/Cart";

const UsrPG: React.FC = () => {
    const currUsr = auth.currentUser;
    const router = useRouter();
    const logOut: () => Promise<void> =
        async () => {
            try {
                await signOut(auth);
                cookies.remove('u');
                router.push('/account/login');
            } catch (err) {
                console.log(err);
            }
        }
    return (
        <main>
            <div className="flex items-center justify-between p-3 mb-7 tab:flex-col tab:items-start tab:gap-4">
                <p className="text-2xl tracking-wide font-semibold">Welcome back, {currUsr?.displayName} 👋</p>
                <button className="py-1 px-5 rounded-xl bg-[#872341]" onClick={logOut} style={{ width: 'fit-content' }}>
                    Logout
                </button>
            </div>
            <section>
                <Cart isUsr />
            </section>
        </main>
    )
}
export default UsrPG;