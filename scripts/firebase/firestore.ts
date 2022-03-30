import { DocumentSnapshot } from "firebase/firestore";
import { setDoc, getDoc, getDocs, doc, collection, addDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { addImageToStorage } from "./storage";

export async function createPost(props: {title:string, price: number, condition: string, image: any}) {

    const mappedImages: any[] = []

    for (const i of props.image) {
        mappedImages.push(i)
    }

    const downloadURLs = await Promise.all(mappedImages.map((image) => addImageToStorage(image)))

    const postDoc = await addDoc(collection(db, "posts"), {
        title: props.title,
        price: props.price,
        condition: props.condition,
        uid: auth.currentUser!.uid,
        createdAt: new Date().getTime(),
        imageURLs: downloadURLs
    })


    const userDoc = await getDoc(doc(db, "users", auth.currentUser!.uid))

    const posts = [...userDoc.data()!.posts, postDoc.id]

    setDoc(doc(db, "users", auth.currentUser!.uid), {

        posts: posts
    }, {merge: true})
}

export async function addPostToCart(id:string) {

    const userDoc = await getDoc(doc(db, "users", auth.currentUser!.uid))

    const cart = [...userDoc.data()!.cart, id]

    setDoc(doc(db, "users", auth.currentUser!.uid), {

        cart: cart
    }, {merge: true})
}

export async function removePostFromCart(id: string) {

    const userDoc = await getDoc(doc(db, "users", auth.currentUser!.uid))

    const cart: string[] = userDoc.data()!.cart
    cart.splice(cart.indexOf(id), 1)

    setDoc(doc(db, "users", auth.currentUser!.uid), {

        cart: cart
    }, {merge: true})
}
