export const generateMetadata = () => {
    return {
        title: 'REGISTER'
    }
};
const Register = () => {
    return (
        <section className="grid justify-center">
            <p className="text-center text-2xl tracking-widest font-semibold">HELLO 👋</p>
            <form action="#" className="my-7">
                <div className="flex items-center gap-4 tab:flex-col tab:gap-0">
                    <input type="text" placeholder="First Name" className="box" required />
                    <input type="text" placeholder="Second Name" className="box" required />
                </div>
                <input type="email" placeholder="Email Address" className="box" required />
                <input type="number" placeholder="Phone Number" className="box" required />
                <input type="password" placeholder="Password" className="box" required />
                <div className="flex justify-between items-center gap-4">
                    <button type="submit" className="box text-muted hover:text-white">
                        Create Account
                    </button>
                </div>
            </form>
        </section>
    )
};
export default Register;