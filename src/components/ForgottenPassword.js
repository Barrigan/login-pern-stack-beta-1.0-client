import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './ForgottenPassword.css'

function ForgottenPassword() {
    let history = useHistory();
    const [pwdRequested, setPwdRequested] = useState(false)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState([])
    const [messageClassName, setMessageClassName] = useState("")

    const onSubmitForm = async e => {
        e.preventDefault()
        setEmail(email.toLowerCase())

        try {
            const body = { email: email.toLowerCase() }
            const response = await fetch("http://localhost:5000/DSUser/requestPwd", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(body => {
                    if (body.error) {
                        setMessageClassName("mt-2 alert alert-danger")
                        if (body.error === "non-existent user") {
                            setMessage(["There is no registered user with that email"])
                        } else {
                            setMessage([body.error])
                        }
                    } else {
                        if (body.message === "Password requested successfully!") {
                            setMessageClassName("mt-2 alert alert-success")
                            setMessage(["Your password has been requested. Please check your email."])
                            setEmail('')
                            setPwdRequested(true)
                        }
                    }
                    //history.push('/home')
                    /* 
                    NEXT STEP HERE:
                    https://www.youtube.com/watch?v=zO5eObZ_K54
                    */
                });
        } catch (err) {
            console.error("Error in response requesting pwd: ", err.message)
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">Forgotten Password Page</h1>
            { pwdRequested ?
                < div className={messageClassName}><ul>{message.map(mess => <li>{mess}</li>)}</ul>
                </div>
                :
                <form className="container flex-column mt-5 col-sm-4"
                    onSubmit={onSubmitForm}>
                    <label htmlFor="email" className="form-label mt-2">Email</label>
                    <input id="email" type="email" required className="form-control mt-2 mn-w"
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <button className="btn btn-success mt-2">Recover Password</button>
                    <div className={messageClassName}><ul>{message.map((mess, index) => <li key={"message-" + index}>{mess}</li>)}</ul></div>
                </form>
            }
            <div className="container flex-column mt-5 col-sm-4">
                <button className="btn btn-primary" onClick={() => history.push('/login')}>Login Page</button>
            </div>
        </Fragment>
    )
}

export default ForgottenPassword
