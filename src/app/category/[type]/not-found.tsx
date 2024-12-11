const NotFoundCategory = ({ type }: { type: string }) => {
    return (
        <div className="flex h-dvh w-full justify-center items-center text-2xl gap-2">
            <p>404 | No page called</p>
            <p className="text-red-500">{type}</p>
        </div>
    )
}
export default NotFoundCategory;