import PostDoc from "../../scripts/interfaces/PostDoc.interface";
import { createStripeCheckout } from "../../scripts/stripe";
import { getDoc, doc, DocumentSnapshot } from "firebase/firestore"
import { auth, db, functions } from "../../scripts/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { httpsCallable, HttpsCallableResult, HttpsCallable } from "firebase/functions";

interface Props {

    posts: PostDoc[]
}

interface CheckoutData {
    uid: string
    posts: any
}

const CheckoutBtn = (props: Props) => {

    const [user] = useAuthState(auth)

    async function handleCartCheckout() {

        const createStripeCheckout: HttpsCallable<CheckoutData, string> = httpsCallable(functions, "createStripeCheckout")

        const postsList: string[] = await (await getDoc(doc(db, "users", user!.uid))).data()!.cart

        const postsData = await (await Promise.all(postsList.map((id: string) => getDoc(doc(db, "posts", id))))).map(post => Object.assign(post.data(), {id: post.id}))

        const sessionId = (await createStripeCheckout({
            uid: user!.uid,
            posts: postsData
        })).data

        // @ts-ignore
        Stripe("pk_test_51K6oGfCM9K7H85bbJHqS1P2kMNlNhf76hfYw7MHc1MKkia0iv71WkFlPedoqJ5zCfDxTAYHvWz2urGYHmLMGihxl004wbXKgRp").redirectToCheckout({sessionId: sessionId.id})
    }

    return (
        <>
            <button
            className="mt-8 w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {

                handleCartCheckout()
            }}
            >
                Check Out
            </button>
        </>
    )
}

export default CheckoutBtn