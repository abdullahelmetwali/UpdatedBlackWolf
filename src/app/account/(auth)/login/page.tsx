"use client";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const signIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, pass);
            if (res.user) {
                router.push(`/account/u/${res?.user?.displayName?.replaceAll(' ', '-').toLowerCase()}`)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message.replaceAll('Firebase: Error ', '') : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="grid justify-center">
            <p className="text-center text-2xl tracking-widest font-semibold">NICE TO SEE YOU 😁</p>
            {error && <p className="text-red-500 mt-2 text-xl font-semibold text-center">{error}</p>}
            <form action="#" className="my-7" onSubmit={signIn}>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="box"
                    style={{ border: `${error && '1px solid #bb2e2e'}` }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="box"
                    style={{ border: `${error && '1px solid #bb2e2e'}` }}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                />
                <div className="flex justify-between items-center gap-4">
                    <button type="submit" className="box text-muted hover:text-white">
                        {loading ? 'Signing in ...' : 'Sign in'}
                    </button>
                    <Link href={`/account/register`} className="box text-center text-muted hover:text-white">
                        Create Account
                    </Link>
                </div>
            </form>
        </section>
    )
}
export default Login;