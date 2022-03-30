import { getDocs, doc, getDoc, collection, DocumentSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import Posts from "../../components/Posts";
import { auth, db } from "../../scripts/firebase/config";
import { removePostFromCart } from "../../scripts/firebase/firestore";


const Home: NextPage = () => {

    return (
        <>
            <Posts
            length={100}
            heading="Cart"
            getFunction={async () => {

                if (!auth.currentUser) return

                const postsList: string[] = await (await getDoc(doc(db, "users", auth.currentUser.uid))).data()!.cart

                const postsData:DocumentSnapshot[] = await Promise.all(postsList.map((id: string) => getDoc(doc(db, "posts", id))))

                return postsData
            }}
            crossOverlay={true}
            crossOnClick={removePostFromCart}
            crossOnClickProps={"id"}
            checkOutBtn={true}
            />
        </>
    )
}

export default Home