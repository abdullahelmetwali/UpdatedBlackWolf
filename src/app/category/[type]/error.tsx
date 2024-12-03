"use client";
const CategoryErr = ({ error }: { error: Error }) => {
    return (
        <p className="h-dvh flex justify-center items-center text-xl text-red-500 text-center">{error.message || 'Sorry something went wrong'}</p>
    )
}
export default CategoryErr;