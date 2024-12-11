const ProductLoading = () => {
    return (
        <main className="flex gap-3 p-5 tab:grid">
            <div className="loader h-dvh w-full"></div>
            <div className="h-full w-full">
                <div className=" tracking-wider">
                    {/* Title Skeleton */}
                    <div className="loader w-44 h-9"></div> <br />
                    <div className="loader w-20 h-7"></div>
                    <div className="text-xl font-black mt-8">SIZES</div>
                    <div className="flex items-center gap-2 my-4">
                        {[...Array(3)]
                            .map((_, idx) => (
                                <div key={idx} className="loader w-20 h-10"></div>
                            ))}
                    </div>
                    <div className="text-xl font-black mt-8">COLORS</div>
                    <div className="flex items-center gap-2 my-4">
                        {[...Array(3)]
                            .map((_, idx) => (
                                <div key={idx} className="loader w-20 h-10"></div>
                            ))}
                    </div>
                    <div className="my-10">
                        <p className="text-xl font-black my-2">DESCRIPTION</p>
                        <div className="border-y-white/40 border-y py-4 text-lg">
                            <div className="loader w-full h-48"></div>
                        </div>
                    </div>
                    <div className="my-10 flex gap-8">
                        <div className="loader w-full h-16"></div>
                        <div className="loader w-full h-16"></div>
                    </div>
                </div>

            </div>
        </main>
    )
}
export default ProductLoading;