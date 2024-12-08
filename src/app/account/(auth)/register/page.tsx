"use client";

import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import cookies from "js-cookie";

const Register = () => {
    const [frName, setFrName] = useState<string>('');
    const [scName, setScName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const submitFnc = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, pass);
            if (res.user) {
                await updateProfile(res.user, {
                    displayName: `${frName} ${scName}`
                })
                cookies.set('u', JSON.stringify(`${frName.toLowerCase()}-${scName.toLowerCase()}`));
                localStorage.setItem('u', JSON.stringify({ ...res.user, cart: [] }));
                router.push(`/account/u/${frName.toLowerCase()}-${scName.toLowerCase()}`)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message.replaceAll('Firebase: Error ', '') : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="grid justify-center">
            <p className="text-center text-2xl tracking-wide font-semibold">NICE TO HAVE A NEW BRO 👋</p>
            {error && <p className="text-red-500 mt-2 text-xl font-semibold text-center">{error}</p>}
            <form action="#" className="my-6" onSubmit={submitFnc}>
                <div className="flex items-center gap-4 tab:flex-col tab:gap-0">
                    <input
                        type="text"
                        placeholder="First Name"
                        className={`box`}
                        value={frName}
                        onChange={(e) => setFrName(e.target.value)}

                    />
                    <input
                        type="text"
                        placeholder="Second Name"
                        className="box"
                        value={scName}
                        onChange={(e) => setScName(e.target.value)}

                    />
                </div>
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
                    <button type="submit" className="box flex justify-center items-center gap-4 text-muted hover:text-white">
                        {loading ? 'Creating Account ...' : 'Create Account'}
                    </button>
                </div>
            </form>
        </section>
    )
};
export default Register;