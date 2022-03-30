import { NextComponentType } from "next";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../scripts/firebase/config";
import { openModal } from "../../scripts/modals"
import Dropdown from "../Dropdown";

const SideBar: NextComponentType = () => {

    const [user] = useAuthState(auth)

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 translate-x-full" id="sideBar">
                <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium items-center">
                    <li>
                        <Link href="/">
                            <a href={undefined} className="hover:text-sky-500 dark:hover:text-sky-400 text-white cursor-pointer">Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/cards">
                            <a href={undefined} className="hover:text-sky-500 dark:hover:text-sky-400 text-white cursor-pointer">Cards</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <a href={undefined} className="hover:text-sky-500 dark:hover:text-sky-400 text-white cursor-pointer">About</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/cart">
                            <a href={undefined} className="hover:text-sky-500 dark:hover:text-sky-400 text-white cursor-pointer">Cart</a>
                        </Link>
                    </li>
                    <li>
                            <Link href="/orders">
                                <a href={undefined} className="hover:text-sky-500 dark:hover:text-sky-400 text-white cursor-pointer">Orders</a>
                            </Link>
                    </li>
                    {user ?
                    <>
                        <li>
                            <div className="w-full grid grid-flow-col gap-x-1 cursor-pointer">
                                <Dropdown
                                triggerName='Account'
                                options={[
                                    {
                                        name: 'Orders',
                                        href: '/orders'
                                    },
                                    {
                                        name: 'Cart',
                                        href: '/cart'
                                    },
                                    {
                                        name: 'Settings',
                                        onClick: () => {
                                            openModal('account-settings')
                                        }
                                    },
                                    {
                                        name: 'Sign Out',
                                        onClick: () => auth.signOut()
                                    }
                                ]}
                                />
                            </div>
                        </li>
                        <li>
                            <p
                            className="hover:text-sky-500 dark:hover:text-sky-400 text-white"
                            onClick={() => openModal("create-post")}
                            >
                                Create Post
                            </p>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <p
                            className="hover:text-sky-500 dark:hover:text-sky-400 text-white"
                            onClick={() => openModal("sign-up")}
                            >
                                Sign Up
                            </p>
                        </li>
                        <li>
                            <p
                            className="hover:text-sky-500 dark:hover:text-sky-400 text-white"
                            onClick={() => openModal("sign-in")}
                            >
                                Sign In
                            </p>

                        </li>
                    </>
                    }
                </ul>
            </div>
        </>
    )
}

export default SideBar