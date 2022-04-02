import { orderBy, query, collection, getDocs } from "firebase/firestore";
import { NextPage } from "next";
import Posts from "../../components/Posts";
import { db } from "../../scripts/firebase/config";


const Home: NextPage = () => {

    return (
        <>
            <Posts
            length={8}
            heading='Most Popular'
            getFunction={async () => {

                const viewsQuery = orderBy("views", "desc")
                const postsRef = collection(db, "posts")

                const q = (await getDocs(query(postsRef, viewsQuery))).docs

                return (await getDocs(query(postsRef, viewsQuery))).docs
            }}
            />
        </>
    )
}

export default Home