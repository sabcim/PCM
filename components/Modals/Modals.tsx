import { updateProfile } from "firebase/auth";
import { NextComponentType } from "next";
import { useRef } from "react";
import { signIn, signUp } from "../../scripts/firebase/auth";
import { auth } from "../../scripts/firebase/config";
import { createPost } from "../../scripts/firebase/firestore";
import { switchModals } from "../../scripts/modals";
import Modal from "./Modal";

const Modals: NextComponentType = () => {

    const signInEmailInput = useRef<any>(null)
    const signInPasswordInput = useRef<any>(null)

    const signUpEmailInput = useRef<any>(null)
    const signUpPasswordInput = useRef<any>(null)
    const signUpDisplayNameInput = useRef<any>(null)

    const newDisplayName = useRef<any>(null)

    const createPostTitle = useRef<any>(null)
    const createPostPrice = useRef<any>(null)
    const createPostCondition = useRef<any>(null)
    const createPostImage = useRef<any>(null)

    return (
        <>
            <Modal modalName="sign-in">
                <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault()
                    signIn({email: signInEmailInput.current!.value, password: signInPasswordInput.current!.value})
                }}
                >
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign In</h3>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"
                        required
                        ref={signInEmailInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                        <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        ref={signInPasswordInput}
                        />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => switchModals("sign-in", "sign-up")}>Create account</a>
                    </div>
                </form>
            </Modal>
            <Modal modalName="sign-up">
                <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault()

                    signUp({
                        email: signUpEmailInput.current!.value,
                        password: signUpPasswordInput.current!.value,
                        displayName: signUpDisplayNameInput.current!.value
                    })
                }}
                >
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign Up</h3>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                        ref={signUpEmailInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="displayName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Display Name</label>
                        <input
                        type="text"
                        name="displayName"
                        id="displayName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="username123"
                        required
                        ref={signUpDisplayNameInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                        <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        ref={signUpPasswordInput}
                        />
                    </div>
                    <div className="flex justify-between flex-col gap-y-2">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                id="privacyPolicy"
                                aria-describedby="Privacy Policy"
                                type="checkbox"
                                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">I have read the <a className='text-blue-500 hover:underline' href="https://www.privacypolicies.com/live/9a281d24-10da-4746-b187-7e304ffab9d4">Privacy Policy</a></label>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                id="termsOfService"
                                aria-describedby="Terms of Service"
                                type="checkbox"
                                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">I have read the <a className='text-blue-500 hover:underline' href="https://www.iubenda.com/terms-and-conditions/66571958">Terms of Service</a></label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => switchModals("sign-up", "sign-in")}>Sign In</a>
                    </div>
                </form>
            </Modal>
            <Modal modalName="account-settings">
                <form
                onSubmit={(e) => {

                    e.preventDefault()

                    updateProfile(auth.currentUser!, {

                        displayName: newDisplayName.current.value
                    })
                }}
                >
                    <h1 className="text-white">Change Display Name</h1>
                    <label htmlFor="displayName" className="mt-3 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Display Name</label>
                    <input
                    ref={newDisplayName}
                    type="text"
                    name="displayName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5">Change</button>
                </form>
            </Modal>
            <Modal modalName="create-post">
                <form
                className="space-y-6"
                onSubmit={(e) => {

                    e.preventDefault()

                    createPost({
                        title: createPostTitle.current.value,
                        price: createPostPrice.current.value,
                        condition: createPostCondition.current.value,
                        image: createPostImage.current.files
                    })
                }}
                >
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Post</h3>
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                        <input
                        type="text"
                        name="title"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Charizard EX"
                        required
                        ref={createPostTitle}
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
                        <input
                        type="number"
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="100"
                        required
                        ref={createPostPrice}
                        />
                    </div>
                    <div>
                        <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card Image</label>
                        <input
                        className="form-control block w-full py-1.5 text-base font-normal text-gray-700 rounded-xl transition ease-in-out m-0 focus:text-gray-700focus:outline-none"
                        type="file"
                        id="file"
                        name="file"
                        ref={createPostImage}
                        multiple
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="condition" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Condition</label>
                        <input
                        type="text"
                        name="condition"
                        id="condition"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Gem Mint"
                        required
                        ref={createPostCondition}
                        />
                    </div>
                    <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Upload Posts
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default Modals