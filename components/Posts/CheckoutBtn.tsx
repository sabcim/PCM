import { NextComponentType } from "next";
import PostDoc from "../../scripts/interfaces/PostDoc.interface";
import { createStripeCheckout } from "../../scripts/stripe";

interface Props {

    posts: PostDoc[]
}

const CheckoutBtn = (props: Props) => {

    return (
        <>
            <button
            className="mt-8 w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {

                createStripeCheckout(props.posts)
            }}
            >
                Check Out
            </button>
        </>
    )
}

export default CheckoutBtn