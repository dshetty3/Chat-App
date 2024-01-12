import React, {useContext} from 'react'
import { signOut } from 'firebase/auth';
import { auth } from "../firebase";
import { AuthContext } from '../context/AuthContext';
//import ICON1 from '/Users/dishashetty/Desktop/Chat-App/chat-app/src/img/ICON1.png';

const Navbar = () => {

    const {currentUser} = useContext(AuthContext)
    return(
        <div className='navbar'>
            <span className='logo'>Chat App</span>
            <div className='user'>
                <img src= {currentUser.photoURL} alt="ICON1"/>
                <span>{currentUser.displayName}</span>
               
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar