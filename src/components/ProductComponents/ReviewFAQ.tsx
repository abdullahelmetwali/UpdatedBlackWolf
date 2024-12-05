"use client";
import React, { useState } from "react";

const Reviews = () => {
    return (
        <>
            {
                [...Array(10)].map((_, index) => (
                    <div key={index} className="p-3 border-white/15 border">
                        <p className="text-xl font-semibold tracking-wider">UserName</p>
                        <p className="text-sm text-[#a1a1aa]">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos fuga officia optio corrupti iusto corporis similique consequatur, libero sed delectus voluptatibus consectetur sequi at adipisci esse sint, quasi maxime eligendi.
                        </p>
                    </div>
                ))
            }
        </>
    )
}
const ReviewFAQ: React.FC = React.memo(() => {
    type SeenOptions = 'reviews' | 'faqs' | 'details';
    const [seen, setSeen] = useState<SeenOptions>('reviews');

    const options: Record<SeenOptions, JSX.Element> = {
        reviews: <Reviews />,
        faqs: <Reviews />,
        details: <Reviews />
    };

    return (
        <>
            <div className="flex justify-between items-center p-3 my-5">
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
        </>
    )
});

ReviewFAQ.displayName = 'ReviewFAQ';
export default ReviewFAQ;