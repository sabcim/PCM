import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import PostDoc from '../../scripts/interfaces/PostDoc.interface'
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc, doc, setDoc, DocumentSnapshot } from "firebase/firestore";
import { HttpsCallable, httpsCallable } from "firebase/functions";
import { auth, db, functions } from "../../scripts/firebase/config";
import { addPostToCart } from "../../scripts/firebase/firestore";
import { createStripeCheckout } from "../../scripts/stripe";
import PostCarousel from "../../components/Carousel/Carousel";
import { convertCurrency } from "../../scripts/currency";
import Link from "next/link";
import Image from "next/image";

interface PostPage extends PostDoc {

    id: string
}

interface CheckoutData {
    uid: string
    posts: any
}


declare global {
    interface StringConstructor {
      toFormatedPrice(s: string): string;
    }
}

// Returns number string with commas
// eg: 1000 => 1,000
String.toFormatedPrice = (s: string) => {

    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Home: NextPage = () => {

    const { query }:any = useRouter();
    const { id }:any = query;

    const [post, setPost] = useState<PostPage | null>(null)
    let [price, setPrice] = useState<number | null>(post ? post.price : null)
    const [postUser, setPostUser] = useState<DocumentSnapshot | null>(null)
    const [user] = useAuthState(auth)


    async function handleCheckout() {

        if (!post) return

        const createStripeCheckout: HttpsCallable<CheckoutData, string> = httpsCallable(functions, "createStripeCheckout")

        const sessionId = (await createStripeCheckout({
            uid: user!.uid,
            posts: [post]
        })).data

        // @ts-ignore
        Stripe("pk_test_51K6oGfCM9K7H85bbJHqS1P2kMNlNhf76hfYw7MHc1MKkia0iv71WkFlPedoqJ5zCfDxTAYHvWz2urGYHmLMGihxl004wbXKgRp").redirectToCheckout({sessionId: sessionId.id})
    }

    useEffect(() => {

        const runAsync = async () => {

            if (!query.id || !post) return

            const localStorageRef = parseInt(window!.localStorage.getItem(query.id) ?? '0')

            if (!localStorageRef) {

                window!.localStorage.setItem(query.id, Math.round(new Date().getTime() / 1000).toString())
                return
            }

            if (localStorageRef + 30 < Math.round(new Date().getTime() / 1000)) {

                window!.localStorage.setItem(query.id, Math.round(new Date().getTime() / 1000).toString())

                const postRef = await getDoc(doc(db, "posts", post!.id))
                setDoc(doc(db, "posts", post!.id), {views: postRef.data()!.views + 1}, {merge: true})
                return
            }
        }

        runAsync()
    })

    useEffect(() => {

        const runAsync = async () => {

            if (!id) return

            const postDocRef:any = await getDoc(doc(db, "posts", id))

            setPost(Object.assign(postDocRef.data(), {id: postDocRef.id}))

        }

        runAsync()
    }, [user, id])

    useEffect(() => {

        const runAsync = async () => {

            if (!post) return

            const postUserDocRef = await getDoc(doc(db, "users", post.uid))
            setPostUser(postUserDocRef)

            if (!user) return

            const userDocRef = await getDoc(doc(db, "users", user.uid))

            if (!userDocRef.exists) return

            const convertedPrice: any  = await convertCurrency(userDocRef.data()!.currency, null, post!.price)

            setPrice(price = Math.round(convertedPrice * 100) / 100)
        }

        runAsync()
    }, [post])

    return (
        <>
            {post ?
                <div className="pt-6 pb-16 sm:pb-24">
                    <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                            <div className="lg:col-start-8 lg:col-span-5">
                                <div className="flex justify-between">
                                    <h1 className="text-xl font-medium text-white">{post.title}</h1>
                                    <p className="text-xl font-medium text-white">{`$${String.toFormatedPrice(price ? price!.toString() : post.price.toString())}`}</p>
                                </div>
                                {postUser ?
                                <Link href={`/u/${postUser.id}`} passHref>
                                    <div className="flex gap-y-5 mt-10 cursor-pointer">
                                        <Image
                                        layout="fill"
                                        src={postUser.data()!.pfp}
                                        alt="Profile Picture"
                                        className="rounded-full w-8"
                                        />
                                        <p className="text-xl font-medium text-white ml-5 hover:underline">
                                            {postUser.data()!.displayName}
                                            </p>
                                    </div>
                                </Link>
                                : null
                                }
                                <div className="flex mt-5">
                                    <p className="text-gray-300 tect-2xl text-bold mr-1">
                                        Condition:
                                    </p>
                                    <p className="text-gray-100">
                                        {post.condition}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                            <h2 className="sr-only">Images</h2>

                            <div className="grid w-96">
                                <PostCarousel imageURLs={post?.imageURLs}/>
                            </div>
                            </div>
                            <div className="mt-8 lg:col-span-5">
                            <button
                            className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                                addPostToCart(post.id)
                            }}
                            >
                            Add to cart
                            </button>
                            <button
                            className="mt-8 w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                                handleCheckout()
                            }}
                            >
                            Buy Now
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            :
            null}

        </>
    )
}

export default Home