import { DocumentSnapshot, getDocs, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../scripts/firebase/config";
import Post from "./Post";
import LoadingPost from "./LoadingPost";
import Carousel from "../Carousel";
import CheckoutBtn from "./CheckoutBtn";
import { convertCurrency } from "../../scripts/currency";

interface Props {

    length: number
    heading: string
    getFunction: () => Promise<DocumentSnapshot[]>
    crossOverlay?: boolean,
    crossOnClick?: () => {}
    crossOnClickProps: "title" | "price" | "condition" | "uid" | "createdAt" | "imageURL" | "id"
    checkOutBtn: boolean
}

const Posts: any = (props: Props) => {

    const [posts, setPosts] = useState<any>(null)
    const [user] = useAuthState(auth)

    useEffect(() => {

        const postsData:any = []

        props.getFunction().then((posts) => {

            let x = 0

            if (!posts) return

            for (let post of posts) {

                if (!post.data()) continue

                postsData.push(Object.assign(post.data(), {"id": post.id}))

                if (x >= props.length - 1) {

                    break
                }

                x++
            }

            setPosts(posts = postsData)
        })
    }, [user])

    return (
        <>
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                    {props.heading}
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                     {posts ?
                     posts.map((post:any) => {

                        return (
                            <Post
                            data={post}
                            crossOverlay={props?.crossOverlay ?? null}
                            crossOnClick={props?.crossOnClick ?? null}
                            crossOnClickProps={props?.crossOnClickProps ?? null}
                            />
                        )
                     })
                     :
                     Array.from(Array(props.length).keys()).map((post, index) => {
                         return <LoadingPost key={index} />
                     })
                     }
                </div>
            </div>
            {
            props.checkOutBtn ?
            <CheckoutBtn posts={posts} />
            : <></>
            }
        </>
    )
}

export default Posts