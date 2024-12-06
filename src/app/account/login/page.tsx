import Link from "next/link";

export const generateMetadata = () => {
    return {
        title: 'LOGIN'
    }
};
const Login = () => {
    return (
        <section className="grid justify-center">
            <p className="text-center text-2xl tracking-widest font-semibold">NICE TO SEE YOU 😁</p>
            <form action="#" className="my-7">
                <input type="email" placeholder="Email Address" className="box" required />
                <input type="password" placeholder="Password" className="box" required />
                <div className="flex justify-between items-center gap-4">
                    <button type="submit" className="box text-muted hover:text-white">
                        Sign in
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