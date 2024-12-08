import { ChoosedItemState, CartMsgsType } from "@/interfaces/Types";
import Image from "next/image";

const CartMessages:
    React.FC<CartMsgsType> = ({ notifications, setChoosedItems, show, setSeeCart }) => {
        return (
            <div className={`w-full fixed flex items-center justify-between p-3 bg-black ${show ? ' top-0 z-50 opacity-100' : '-top-full z-0 opacity-0'} transition-all duration-300 ease-in-out`}>
                <button onClick={() => setChoosedItems(prev => ({ ...prev, show: false }))}>
                    <Image
                        src={`/icons/close.svg`}
                        width={24}
                        height={24}
                        alt="Close"
                        title="Close message"
                    />
                </button>
                <div className="text-center">
                    <div>
                        {notifications[0] === 'ALREADY ADDED TO CART' ? <span className="my-4  text-red-600">{notifications[0]}</span> : notifications[0]}
                        {notifications.length > 1 && <span> - {notifications[1]}$</span>}
                    </div>
                    <div>
                        {
                            notifications.length > 1 &&
                            <>
                                {notifications[2]}
                                <span> - {notifications[3]}</span>
                                <p className="text-[#25539f]">ADDED TO CART</p>
                            </>
                        }
                    </div>
                </div>
                <button
                    title="View cart"
                    onClick={() => {
                        setChoosedItems(prev => ({ ...prev, show: false }));
                        setSeeCart((prev: boolean) => !prev)
                    }}
                >
                    VIEW CART
                </button>
            </div>
        )
    }
export default CartMessages;