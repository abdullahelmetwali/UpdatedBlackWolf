import { CartMsgsType } from "@/interfaces/Types";
import { X } from "lucide-react";
import React from "react";

const CartMessages: React.FC<CartMsgsType> =
    React.memo(({ notifications, setChoosedItems, show, setSeeCart }) => {
        return (
            <div className={`w-full fixed flex items-center justify-between p-3 bg-black ${show ? ' top-0 z-50 opacity-100' : '-top-full z-0 opacity-0'} transition-all duration-300 ease-in-out`}>
                <button onClick={() => setChoosedItems(prev => ({ ...prev, show: false }))} title="Close message">
                    <X color="#a1a1a1" width={24} height={24} />
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
    });

CartMessages.displayName = 'CartMessages';
export default CartMessages;