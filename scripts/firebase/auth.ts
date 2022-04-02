import { setDoc, doc, addDoc, collection } from "firebase/firestore"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "./config"

export async function signIn(props: {email: string, password:string}) {

    try {

        await signInWithEmailAndPassword(auth, props.email, props.password)

        setDoc(doc(db, "users", auth.currentUser!.uid), {

            email: auth.currentUser!.email,
            displayName: auth.currentUser!.displayName,
            pfp: auth.currentUser!.photoURL
        }, {merge: true})
    } catch(e) {console.log}

}

export async function signUp(props: {email: string, password:string, displayName: string}) {

    try {

        await createUserWithEmailAndPassword(auth, props.email, props.password)



        await updateProfile(auth.currentUser!, {
            displayName: props.displayName,
            photoURL: `https://avatars.dicebear.com/api/identicon/${auth!.currentUser!.email}.svg?background=000`
        })

        await setDoc(doc(db, "users", auth.currentUser!.uid), {

            email: auth.currentUser!.email,
            displayName: auth.currentUser!.displayName,
            pfp: auth.currentUser!.photoURL,
            cart: []
        }, {merge: true})
    } catch(e) {console.log}
}

auth.onAuthStateChanged((user) => {

    if (user) {

        setDoc(doc(db, "users", user.uid), {

            email: user.email,
            displayName: user.displayName,
            pfp: user.photoURL,
        }, {merge: true})

        updateProfile(auth.currentUser!,
        {
            photoURL: `https://avatars.dicebear.com/api/identicon/${user.email}.svg?background=000`
        })
    }
})