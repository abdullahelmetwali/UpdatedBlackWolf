import { ReactNode } from "react";

const AccLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="py-16 my-10 px-3">
            {children}
        </main>
    )
}
export default AccLayout;