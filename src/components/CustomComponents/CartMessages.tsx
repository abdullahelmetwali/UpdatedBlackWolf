import Image from "next/image";
// notifications={[message.title, message.price, message.color, message.size]}
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
                <p>{notifications[1]}</p>
                {
                    typeof notifications === 'object' &&
                    <>
                        <p>{notifications[1]}</p>
                        <p>ADDED TO CART</p>
                    </>
                }
            </div>
            <div>
                <button>
                    VIEW CART
                </button>
            </div>
        </div>
    )
}
export default CartMessages;