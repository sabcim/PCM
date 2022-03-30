import { getDoc, doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { convertCurrency } from "../../scripts/currency";
import { auth, db } from "../../scripts/firebase/config";
import postCarousel from "../Carousel/Carousel";

const ting = 1 === 1 ?? 'f'

declare global {
    interface StringConstructor {
      toFormatedPrice(s: string): string;
    }
}

// Returns number string with commas
// eg: 1000 => 1,000
String.toFormatedPrice = (s: string) => {

    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


interface Props {

    data: {

        title: string,
        price: number,
        condition: string,
        uid: any,
        createdAt: any,
        imageURL: string,
        imageURLs: string[],
        id: string,
    },

    crossOverlay: boolean | null,
    crossOnClick: (() => {}) | any
    crossOnClickProps: "title" | "price" | "condition" | "uid" | "createdAt" | "imageURL" | "id" | "imageURLs" | null
}

const Post = (props: Props) => {

    const [imgLoaded, setImgLoaded] = useState<boolean>(false)
    let [price, setPrice] = useState<number>(props.data.price)
    const [user] = useAuthState(auth)

    useEffect(() => {

      const getCurrency = async () => {

        if (!user) return
        const userDocRef = await getDoc(doc(db, "users", user.uid))

        if (!userDocRef.exists) return

        const convertedPrice: any  = await convertCurrency(userDocRef.data()!.currency, null, props.data.price)

        setPrice(price = Math.round(convertedPrice * 100) / 100)
      }

      getCurrency()
    }, [user])

    return (
        <>
            <div key={props.data.id} className={`group ${imgLoaded ? 'block' : 'hidden'}`}>
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none relative">
                <img
                  src={props.data.imageURLs[0]}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  onLoad={() => setImgLoaded(true)}
                />
                <Link href={`/p/${props.data.id}`}>
                  <div className="absolute cursor-pointer inset-0 z-10"></div>
                </Link>
                {
                  props.crossOverlay && props.crossOnClick ?
                  <div className="select-none absolute cursor-pointer inset-0">
                    <h1 className="text-3xl absolute top-0 left-0 w-auto ml-5 mt-5 text-slate-50 hidden group-hover:block">
                      <span className="relative rounded opacity-50 z-20 cursor-pointer bg-black aspect-square h-full px-2">
                        <span
                        className="opacity-100"
                        onClick={() => props.crossOnClick() ? (props.crossOnClickProps ? props.crossOnClick(props.data[props.crossOnClickProps]) : null ) : null}
                        >
                            ✖
                        </span>
                      </span>
                    </h1>
                  </div> : null
                }

              </div>
              <div className="mt-4 flex justify-between">
                <div className="w-full grid">
                  <h3 className="text-sm text-gray-400">
                    <Link href={`/p/${props.data.id}`}>
                      <span>{props.data.title}</span>
                    </Link>
                  </h3>
                  <h3 className="text-sm text-gray-400">
                    <a href='#'>
                      {`$${String.toFormatedPrice(price.toString())}`}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">{props.data.condition}</p>
                </div>
                <p className="text-sm font-medium text-gray-900"></p>
              </div>
            </div>
        </>
    )
}


export default Post