"use client";
import Link from "next/link";
import cookies from "js-cookie";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
    const [usrDT, setUsrDT] = useState({
        email: '',
        pass: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (cookies.get('u')) {
            router.push(`/account/u/${cookies.get('u')}`);
        }
    }, [router]);

    const signIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, usrDT.email, usrDT.pass);
            if (res.user) {
                const userName = res?.user?.displayName?.replaceAll(' ', '-').toLowerCase();
                cookies.set('u', JSON.stringify(userName));
                router.push(`/account/u/${userName}`);
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
            {error && <p className="text-red-500 mt-2 text-xl font-semibold text-center">{error.includes('auth') ? 'Invalid email or password' : 'Check your network!'}</p>}
            <form action="#" className="my-7" onSubmit={signIn}>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="box"
                    style={{ border: `${error && '1px solid #bb2e2e'}` }}
                    value={usrDT.email}
                    onChange={(e) => setUsrDT({ ...usrDT, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="box"
                    style={{ border: `${error && '1px solid #bb2e2e'}` }}
                    value={usrDT.pass}
                    onChange={(e) => setUsrDT({ ...usrDT, pass: e.target.value })}
                    required
                />
                <div className="flex justify-between items-center gap-4">
                    <button type="submit" className="box text-muted hover:text-white">
                        {loading ? 'Please wait...' : 'Sign in'}
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