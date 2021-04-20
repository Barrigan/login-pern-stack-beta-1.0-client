import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import pwdPreValidation from '../pwdValidation'
import './Register.css'

const bcrypt = require('bcryptjs')



const Register = () => {
    let history = useHistory()
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState([])
    const [messageClassName, setMessageClassName] = useState("")
    const [registered, setRegistered] = useState(false)

    const onSubmitForm = async e => {
        e.preventDefault()
        setEmail(email.toLowerCase())
        let pwdPrevalidated = pwdPreValidation(password)
        if (pwdPrevalidated.length >= 1) {
            setMessage(pwdPrevalidated)
            setMessageClassName("mt-2 alert alert-danger")
        } else {
            setMessage([])
            setMessageClassName("")
            try {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                const body = { fname: fname, lname: lname, email: email.toLowerCase(), password: hash }
                const response = await fetch("http://localhost:5000/DSUser/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
                    .then(response => response.json())
                    .then(body => {
                        if (body.error) {
                            setMessageClassName("mt-2 alert alert-danger")
                            if (body.error === "duplicated email") {
                                setMessage(["There is already a registered user with that email"])
                            } else {
                                setMessage([body.error])
                            }
                        } else {
                            setMessage(["You have successfully registered!. Now you can login :)"])
                            setMessageClassName("mt-2 alert alert-success")
                            setRegistered(true)
                        }
                    })
            } catch (err) {
                setMessage([err.message])
                setMessageClassName("mt-2 alert alert-success")
            }
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Registration Page</h1>
            {registered ?
                <div className={messageClassName}><ul>{message.map((mess, index) => <li key={"top-message-" + index}>{mess}</li>)}</ul></div>
                :
                <form className="container flex-column mt-5 col-sm-4"
                    onSubmit={onSubmitForm}>

                    <label htmlFor="fname" className="form-label mt-2">First Name</label>
                    <input id="fname" type="text" required className="form-control mt-2 mn-w"
                        value={fname} onChange={e => setFname(e.target.value)} />

                    <label htmlFor="lname" className="form-label mt-2">Last Name</label>
                    <input id="lname" type="text" required className="form-control mt-2 mn-w"
                        value={lname} onChange={e => setLname(e.target.value)} />

                    <label htmlFor="email" className="form-label mt-2">Email</label>
                    <input id="email" type="email" required className="form-control mt-2 mn-w"
                        value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password" className="form-label mt-2">Password</label>
                    <input id="password" type="password" required className="form-control mt-2 mn-w"
                        value={password} onChange={e => setPassword(e.target.value)} />

                    <button className="btn btn-success mt-2">Register</button>
                    <div className={messageClassName}><ul>{message.map((mess, index) => <li key={"message-" + index}>{mess}</li>)}</ul></div>
                </form>
            }
            <div className="container flex-column mt-5 col-sm-4">
                <button className="btn btn-primary" onClick={() => history.push('/login')}>Login Page</button>
            </div>

        </Fragment>
    )
}

export default Register
