import { setDoc, doc, getDocs, collection, addDoc } from "firebase/firestore"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "./config"

export function signIn(props: {email: string, password:string}) {

    signInWithEmailAndPassword(auth, props.email, props.password).then((res) => {

        console.log("Sucessfully signed in")
    }).catch((e) => {

        alert(e)
    })
}

export function signUp(props: {email: string, password:string, displayName: string}) {

    createUserWithEmailAndPassword(auth, props.email, props.password).then((res) => {

        updateProfile(auth.currentUser!, {displayName: props.displayName}).then(() => {

            console.log("Sucessfully signed up", auth.currentUser)
        }).catch(alert)
    }).catch(alert)
}

auth.onAuthStateChanged((user) => {

    if (user) {

        setDoc(doc(db, "users", user.uid), {

            email: user.email,
            displayName: user.displayName
        }, {merge: true})
    }
})
