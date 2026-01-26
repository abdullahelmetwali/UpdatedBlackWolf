export default function CategoryLoading() {
    return (
        <div className="grid grid-cols-3 gap-3 tab:grid-cols-2 my-5">
            {
                [...Array(9)].map((_, index) => (
                    <div key={index} className="loader w-full h-[35rem] tab:h-[27rem] rounded-lg"></div>
                ))
            }
        </div>
    )
}