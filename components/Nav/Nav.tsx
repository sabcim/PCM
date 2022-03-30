import { NextComponentType } from "next"
import Dropdown from "../Dropdown"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../../scripts/firebase/config"
import { openModal } from "../../scripts/modals"
import Link from "next/link"
import { MenuIcon } from "@heroicons/react/solid"
import SideBar from "./SideBar"

function openSidebar() {

    const sideBarRef = document.getElementById("sideBar")

    sideBarRef?.classList.remove('translate-x-full')

    console.log(sideBarRef?.classList)
}

const Nav:NextComponentType = () => {

    const [user] = useAuthState(auth)

    return (
        <>
            <div className="w-full my-10 px-10 flex flex-cols items-center justify-between">
                <img className="hidden lg:block h-8 w-auto" src="/Images/logo.svg" alt="Workflow"/>
                <button>
                    <SideBar />
                    <MenuIcon className="-mr-1 ml-2 h-5 w-5 md:hidden lg:hidden sm: block" fill="white" onClick={() => openSidebar()}/>
                </button>
                <div className="hidden w-full md:block md:w-auto">
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
            </div>
        </>
    )
}

export default Nav