import { MessageState } from "@/interfaces/Types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const CartMessages:
    React.FC<{ notifications: string[] | string, setMessage: Dispatch<SetStateAction<MessageState>> }> = ({ notifications, setMessage }) => {
        return (
            <div className="w-full flex items-center justify-between fixed z-50 p-3 bg-black">
                <button onClick={() => setMessage(prev => ({ ...prev, show: false }))}>
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
                        {notifications[0]}
                        {typeof notifications === 'object' && <span> - {notifications[1]}$</span>}
                    </div>
                    <div>
                        {
                            typeof notifications === 'object' &&
                            <>
                                {notifications[2]}
                                <span> - {notifications[3]}</span>
                                <p className="text-[#25539f]">ADDED TO CART</p>
                            </>
                        }
                    </div>
                </div>
                <button title="View cart">
                    VIEW CART
                </button>
            </div>
        )
    }
export default CartMessages;