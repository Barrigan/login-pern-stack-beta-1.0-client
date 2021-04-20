import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../features/user/authSlice'

function Login() {
    const dispatch = useDispatch();
    let history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState([])
    const [messageClassName, setMessageClassName] = useState("")

    const onSubmitForm = async e => {
        e.preventDefault()
        setEmail(email.toLowerCase())
        try {
            const body = { email: email.toLowerCase(), password: password }
            const response = await fetch("http://localhost:5000/DSUser/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(body => {
                    if (body.error) {
                        setMessageClassName("mt-2 alert alert-danger")
                        if (body.error === "invalid password or user") {
                            setMessage(["Invalid password or user."])
                        } else {
                            setMessage([body.error])
                        }
                    } else if (body && body.dsuser_uid && body.first_name && body.dsuser_uid !== "" && body.first_name !== "") {
                        dispatch(login({
                            user: {
                                id: body.dsuser_uid,
                                name: body.first_name
                            }
                        }))
                        setEmail('')
                        setPassword('')
                        history.push('/home')
                        /* NEXT STEPS:
                        1) IMPLEMENT SESSION FOLLOWING THIS VIDEO:
                            https://www.youtube.com/watch?v=s2aXBBzazAw
                        2) SEND ACTIVATION EMAIL AND ACTIVATE USER
                        */
                    } else {
                        setMessageClassName("mt-2 alert alert-danger")
                        setMessage(["It was not possible to login at this moment."])
                    }

                });
        } catch (err) {
            setMessageClassName("mt-2 alert alert-danger")
            setMessage([err.message])
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">Login Page</h1>
            <form className="container flex-column mt-5 col-sm-4"
                onSubmit={onSubmitForm}>
                <label htmlFor="email" className="form-label mt-2">Email</label>
                <input id="email" type="email" required className="form-control mt-2 mn-w"
                    value={email} onChange={e => setEmail(e.target.value)} />

                <label htmlFor="password" className="form-label mt-2">Password</label>
                <input id="password" type="password" required className="form-control mt-2 mn-w"
                    value={password} onChange={e => setPassword(e.target.value)} />

                <button className="btn btn-success mt-2">Login</button>
                <div className={messageClassName}><ul>{message.map((mess, index) => <li key={"message-" + index}>{mess}</li>)}</ul></div>

            </form>
            <div className="container flex-column mt-5 col-sm-4">
                <p className="text-center mt-5"><a href='/forgottenPassword'>Forgotten password?</a></p>
                <button className="btn btn-primary" onClick={() => history.push('/register')}>Register with us</button>
            </div>

        </Fragment>
    )
}

export default Login
