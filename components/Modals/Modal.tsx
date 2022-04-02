import { NextComponentType } from "next";
import { ReactChild, useRef } from "react";

interface Props {

    modalName: string
    children: ReactChild
    data?: any
}

const Modal: any = (props: Props) => {

    const modalRef = useRef<any>(null)

    function closeModal() {

        modalRef.current!.style.display="none"
    }

    return (
        <>
            <div ref={modalRef} className='hidden' id={`modal-${props.modalName}`}>
                <div
                id="authentication-modal"
                className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 flex"
                >
                    <div className="relative px-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex justify-end p-2">
                                <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                onClick={closeModal}
                                id="close-modal-btn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-black opacity-50 fixed top-0 bottom-0 right-0 left-0"></div>
            </div>
        </>
    )
}

export default Modal