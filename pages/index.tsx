import type { NextPage } from 'next'
import Posts from '../components/Posts'
import { db } from '../scripts/firebase/config'
import { getDocs, collection } from 'firebase/firestore'
import SearchBar from '../components/SearchBar'

async function Peenis() {

  return 'a'
}

const Home: NextPage = () => {

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
