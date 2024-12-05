export default function CategoryLoading() {
    return (
        <div className="grid grid-cols-3 gap-3 tab:grid-cols-1 my-5">
            {
                [...Array(9)].map((_, index) => (
                    <div key={index} className="loader w-full h-[40rem] rounded-lg"></div>
                ))
            }
        </div>
    )
}