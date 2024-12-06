"use client";
import Image from "next/image";
import React, { useState } from "react";

const Reviews = () => {
    return (
        <div className="scrollbox gap-2">
            {
                [...Array(10)].map((_, index) => (
                    <div key={index} className="p-3 border-white/25 border rounded-lg w-full">
                        <p className="text-xl font-semibold tracking-wider">username</p>
                        <p className="text-sm text-muted w-72 my-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos fuga officia optio corrupti iusto corporis similique consequatur, libero sed delectus voluptatibus consectetur sequi at adipisci esse sint, quasi maxime eligendi.
                        </p>
                    </div>
                ))
            }
        </div>
    )
};
const FAQs = () => {
    const [seenQues, setSeenQues] = useState<number | null>(null);
    return (
        <div className="grid grid-cols-2 gap-4 tab:grid-cols-1">
            {
                [...Array(8)].map((_, index) => (
                    <div key={index}>
                        <button className="flex items-center justify-between w-full"
                            onClick={() => setSeenQues((prev) => prev === index ? null : index)}
                        >
                            <p>Question {index + 1} </p>
                            <div>
                                <Image
                                    src={`${seenQues === index ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'}`}
                                    alt="See"
                                    width={24}
                                    height={24}
                                    title={`${seenQues === index ? 'Hide' : 'See'}`}
                                />
                            </div>
                        </button>
                        <div className={`overflow-hidden my-2 text-muted ${seenQues === index ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
                            } transition-all duration-300 ease-in-out`}>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati eum animi atque numquam, expedita ipsum totam minima harum nisi quas eos cupiditate impedit vel maiores officia nesciunt non, enim temporibus?
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};
const Details = () => {
    return (
        <div>
            <p className="text-xl tracking-wider uppercase font-semibold">Here&apos;s some details about product</p>
            <p className="text-muted my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam exercitationem, tempora expedita iste natus esse blanditiis libero sunt harum quis quidem reprehenderit cumque tenetur nobis quo illo asperiores nesciunt minus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis minima harum, amet itaque quos nam fugiat magni. Sapiente harum quidem porro praesentium dignissimos dolorem dicta aperiam ex, ullam, modi voluptas?
            </p>
        </div>
    )
};

const ReviewFAQ: React.FC = React.memo(() => {
    type SeenOptions = 'reviews' | 'faqs' | 'details';
    const [seen, setSeen] = useState<SeenOptions>('faqs');

    const options: Record<SeenOptions, JSX.Element> = {
        reviews: <Reviews />,
        faqs: <FAQs />,
        details: <Details />
    };

    return (
        <main className="p-8 my-6">
            <div className="flex justify-between items-center my-8">
                <button
                    className={`text-xl ${seen === 'details' ? 'opacity-100 bg-[#303030]' : 'opacity-60'} px-4 py-1 rounded-2xl tracking-wider`}
                    onClick={() => setSeen('details')}
                >
                    Details
                </button>
                <button
                    className={`text-xl ${seen === 'reviews' ? 'opacity-100 bg-[#303030]' : 'opacity-60'} px-4 py-1 rounded-2xl tracking-wider`}
                    onClick={() => setSeen('reviews')}
                >
                    Reviews
                </button>
                <button
                    className={`text-xl ${seen === 'faqs' ? 'opacity-100 bg-[#303030]' : 'opacity-60'} px-4 py-1 rounded-2xl tracking-wider`}
                    onClick={() => setSeen('faqs')}
                >
                    FAQs
                </button>
            </div>
            {options[seen] || options.details}

        </main>
    )
});

ReviewFAQ.displayName = 'ReviewFAQ';
export default ReviewFAQ;