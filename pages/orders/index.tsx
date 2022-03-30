import { getDocs, getDoc, doc, collection, where, query, QueryDocumentSnapshot, DocumentData, DocumentSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Posts from "../../components/Posts";
import { secondsDate } from "../../scripts/date";
import { auth, db } from "../../scripts/firebase/config";
import OrderDoc from "../../scripts/interfaces/OrderDoc.interface";
import PostDoc from "../../scripts/interfaces/PostDoc.interface";

interface Order {

    posts: PostDoc[]
    data: OrderDoc
}

const Home: NextPage = () => {

    let [orders, setOrders] = useState<null | undefined | any>(null)
    const [user] = useAuthState(auth)

    useEffect(() => {

        const getOrders = async () => {

            if (!user) return

            // Ref to order collection
            const ordersRef = collection(db, "orders")

            // Order by orders belonging to current user
            const orderQuery = where("user", "==", user!.uid)

            const queriedOrders = await getDocs(query(ordersRef, orderQuery))

            const orderPosts = await Promise.all(queriedOrders.docs.map(async (order: QueryDocumentSnapshot<DocumentData>) => {

                return (
                    {
                        posts: await Promise.all(order.data().posts.map(async (post: any) => {

                            return (await getDoc(doc(db, "posts", post)))
                        })),
                        data: order.data()
                    })
            })
            )

            setOrders(orders = orderPosts)
        }

        getOrders()
    }, [user])

    return (
        <>
            {orders ?
            <>
                {orders.map((order: Order, index: number) => {

                    const secondsDateObj = new secondsDate(order.data.createdAt.seconds)
                    secondsDateObj.secondsToDate()
                    secondsDateObj.toFullDate()

                    return (
                    <div
                    key={index}
                    className="grid grid-flow-row"
                    >
                        <Posts
                        length={100}
                        heading={`Order ${index + 1}`}
                        getFunction={async () => {

                            return order.posts.map((post) => {

                                return post
                            })
                        }}
                        />
                        <div className="text-white text-lg">
                            {`${secondsDateObj.fullDate!.month} ${secondsDateObj.fullDate!.day}, ${secondsDateObj.fullDate!.year}`}
                        </div>
                    </div>
                )
                })}
            </>
            : null}
        </>
    )
}

export default Home
