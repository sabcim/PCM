import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostDoc from '../../scripts/interfaces/PostDoc.interface'
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../scripts/firebase/config";
import { addPostToCart } from "../../scripts/firebase/firestore";
import { createStripeCheckout } from "../../scripts/stripe";
import PostCarousel from "../../components/Carousel/Carousel";

interface PostPage extends PostDoc {

    id: string
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
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

const Home: NextPage = () => {

    const { query } = useRouter();
    const { id }:any = query;

    const [post, setPost] = useState<PostPage | null>(null)
    const [user] = useAuthState(auth)

    useEffect(() => {

        if (!id) return

        getDoc(doc(db, "posts", id)).then(((res: any) => {

            setPost(Object.assign(res.data(), {id: res.id}))
        }))
    }, [user])

    return (
        <>
            {post ?
                <div className="pt-6 pb-16 sm:pb-24">
                    <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                            <div className="lg:col-start-8 lg:col-span-5">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-white">{post.title}</h1>
                                <p className="text-xl font-medium text-white">{`$${String.toFormatedPrice(post.price.toString())}`}</p>
                            </div>
                            </div>
                            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                            <h2 className="sr-only">Images</h2>

                            <div className="grid w-96">
                                {
                                /*
                                TODO: ADD AN IMAGE CAROUSEL FOR MULTI-IMAGE POSTS
                                */
                                }
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
                                createStripeCheckout([post])
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