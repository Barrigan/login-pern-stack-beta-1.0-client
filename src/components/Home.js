import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout, checkUserLogged } from "../features/user/authSlice";
import { useHistory } from "react-router-dom";

function Home() {
    let history = useHistory()
    const dispatch = useDispatch()

    const submitLogout = () => {
        dispatch(logout())
        history.push('/login')
    }

    const user = useSelector(checkUserLogged)
    return (
        <div className="text-center mt-5">
            <h1>Welcome to the Home Page {user.user.name}</h1>
            <button onClick={submitLogout}>Logout</button>
        </div>
    )
}

export default Home