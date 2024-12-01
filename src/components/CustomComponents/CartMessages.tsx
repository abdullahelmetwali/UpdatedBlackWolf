import Image from "next/image";

const CartMessages: React.FC<{ notifications: string[] | string }> = ({ notifications }) => {
    return (
        <div className="w-full flex items-center justify-between fixed z-50 p-3">
            <div>
                <Image
                    src={`/icons/close.svg`}
                    width={24}
                    height={24}
                    alt="Close"
                    title="Close"
                />
            </div>
            <div>
                <p>{notifications[0]}</p>
                {
                    notifications[1] !== '' || notifications[1] !== undefined &&
                    <>
                        <p>{notifications[1]}</p>
                        <p>ADDED TO CART</p>
                    </>
                }
            </div>
        </div>
    )
}
export default CartMessages;