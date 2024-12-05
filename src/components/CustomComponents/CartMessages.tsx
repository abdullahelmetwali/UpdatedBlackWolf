import { ChoosedItemState } from "@/interfaces/Types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const CartMessages:
    React.FC<{ notifications: string[] | string, setChoosedItems: Dispatch<SetStateAction<ChoosedItemState>>, show: boolean }> = ({ notifications, setChoosedItems, show }) => {
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