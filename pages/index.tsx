import type { NextPage } from 'next'
import Posts from '../components/Posts'
import { auth, db } from '../scripts/firebase/config'
import { getDocs, collection } from 'firebase/firestore'
import SearchBar from '../components/SearchBar'
import { useAuthState } from 'react-firebase-hooks/auth'

const Home: NextPage = () => {

    const [user] = useAuthState(auth)

    return (
        <>
            <SearchBar />
            <Posts
            length={8}
            heading="Posts"
            getFunction={async() => {
                return (await getDocs(collection(db, "posts"))).docs
            }}
            />
        </>
    )
}

export default Home
