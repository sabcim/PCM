import { useRouter } from "next/router"
import { getDocs, collection } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Posts from "../../components/Posts"
import { db } from "../../scripts/firebase/config"
import { DocumentSnapshot } from "@google-cloud/firestore"
import { compareTwoStrings } from 'string-similarity'

export default function Home() {

    const { query }:any = useRouter()

    return (
        <>
            {query.query ?
            <>
                <Posts
                length={40}
                heading={`Search results for "${query.query ? query.query.replace("%20", " ") : '...'}"`}
                getFunction={async () => {

                    const postsRef = await getDocs(collection(db, "posts"))
                    const postHeaders:any = postsRef.docs.map(post =>
                        ({
                            post: post,
                            similarity: compareTwoStrings(post.data().title.toLowerCase(), query.query.replace("%20", " ").toLowerCase()) + (post.data().title.length / 1000)
                        })
                    )

                    return postHeaders
                        // Eliminate all similarities under .2
                        .filter((post:any) => post.similarity > .2)
                        // Order by similarity
                        .sort(function(a:any, b:any) {return a.similarity - b.similarity})
                        // Map into just the post
                        .map((post:any) => post.post)
                        // Reverse the list for ascending order
                        .reverse()

                }}

                ></Posts>
            </>
            :
            null
            }
        </>
    )
    }