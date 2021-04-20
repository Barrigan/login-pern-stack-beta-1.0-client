import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import pwdPreValidation from '../pwdValidation'
import './ResetPassword.css'

const bcrypt = require('bcryptjs')

function ResetPassword() {
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [message, setMessage] = useState([])
    const [messageClassName, setMessageClassName] = useState("")
    const [invalidToken, setInvalidToken] = useState(false)
    const [resetSuccessful, setResetSuccessful] = useState(false)
    let history = useHistory();

    let location = useLocation()
    let token;
    if (location && location !== "" && location.search.substring(0, 7) === "?token=") {
        token = location.search.substring(7)
    }

    const resetPwd = async () => {
        try {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            const body = { token: token, password: hash }
            const response = await fetch("http://localhost:5000/DSUser/resetPwd", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(body => {
                    if (body.error && body.error !== "") {
                        setMessage([body.error])
                        setMessageClassName("alert alert-danger")
                    } else if (body.message && body.message === "Password updated succesfully") {
                        setResetSuccessful(true)
                        setMessage(["Congratulations! Your password has been updated successfully!"])
                        setMessageClassName("alert alert-success")
                    } else if (body.tokenStatus !== "") {
                        setInvalidToken(true)
                        let messageArray = []
                        messageArray.push("Sorry this token has expired or has already been used.")
                        messageArray.push("Remember you only have 15 minutes to reset your password and you can use this link only Once.")
                        messageArray.push("Please go to 'Forgot your password' section again and request a new password again.")
                        setMessage(messageArray)
                        setMessageClassName("alert alert-danger")
                    }
                });
        } catch (err) {
            setMessage(err.message)
            setMessageClassName("alert alert-danger")
        }
    }

    const onSubmitForm = e => {
        e.preventDefault()
        let pwdPrevalidated = pwdPreValidation(password, repeatedPassword)
        if (pwdPrevalidated.length >= 1) {
            setMessage(pwdPrevalidated)
            setMessageClassName("errorMessageOn")
        } else {
            setMessage([])
            setMessageClassName("")
            resetPwd()
        }
    }
    return (
        <div>
            <h1 className="text-center mt-5">Password Reset Page</h1>
            { invalidToken ?

                <div className={messageClassName}><ul>{message.map((mess, index) => <li key={"top-message-" + index}>{mess}</li>)}</ul></div>
                : resetSuccessful ?
                    <div className={messageClassName}><ul>{message.map((mess, index) => <li key={"top-message-" + index}>{mess}</li>)}</ul></div>
                    :
                    <>
                        <form className="container flex-column mt-5 col-sm-4"
                            onSubmit={onSubmitForm}>

                            <label htmlFor="password" className="form-label mt-2">Write your new Password</label>
                            <input id="password" type="password" required className="form-control mt-2 mn-w"
                                value={password} onChange={e => setPassword(e.target.value)} />

                            <label htmlFor="repeatedPassword" className="form-label mt-2">Repeat your new Password</label>
                            <input id="repeatedPassword" type="password" required className="form-control mt-2 mn-w"
                                value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} />
                            <button className="btn btn-success mt-2">Save</button>
                            <div className={messageClassName}><ul>{message.map((mess, index) => <li key={"message-" + index}>{mess}</li>)}</ul></div>
                        </form>
                    </>
            }
            <div className="container flex-column mt-5 col-sm-4">
                <button className="btn btn-primary" onClick={() => history.push('/login')}>Login Page</button>
            </div>
        </div>
    )
}

export default ResetPassword
