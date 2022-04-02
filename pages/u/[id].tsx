import { getDocs, getDoc, doc, collection, where, query } from "firebase/firestore";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from 'react-firebase-hooks/firestore'
import Posts from "../../components/Posts";
import { auth, db } from "../../scripts/firebase/config";
import { doThing } from "../../scripts/firebase/firestore";

const Home: NextPage = () => {

    const userIdQuery:any = useRouter()
    const [userDocRef] = useDocument(doc(db, 'users', userIdQuery.query.id ?? 'nRtddYO9vqVFdoqGFWO3oxMty973'))
    const [user] = useAuthState(auth)

    return (
        <>
            {userDocRef ?
            <div className="flex w-full">
                <Image
                layout="fill"
                src={userDocRef.data()!.pfp}
                alt="Profile Picture"
                className="rounded-full w-1/3"
                />
                <div>
                    <p className="text-6xl text-white ml-5 mt-10">
                        {userDocRef.data()!.displayName}
                    </p>
                    <p className="text-3xl text-gray-100">
                        {}
                    </p>
                </div>
            </div>
            :
            null}
            <>
                <Posts
                length={40}
                title='User Posts'
                getFunction={async () => {

                    if (!userIdQuery.query.id) return

                    const postsRef = collection(db, "posts")
                    const userQuery = where("uid", "==", userIdQuery.query.id)
                    const userPosts = await getDocs(query(postsRef, userQuery))

                    return userPosts.docs
                }
                }
                />
            </>
        </>
    )
}

export default Home