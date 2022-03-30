import { NextComponentType } from "next";
import Modals from "../Modals";
import Nav from "../Nav";


const Layout:NextComponentType = (props) => {

    return (
        <>
            <Modals />
            <Nav />
            <div className='sm:px-10 md:px-20 lg:px-32'>
                {props.children}
            </div>
        </>
    )
}

export default Layout