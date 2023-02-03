import React, { useState } from 'react';

function Register ({onRouteChange, loadUser, user}) {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");

    const handleEmailChange = ({target}) => {
        setRegisterEmail (target.value);
    }

    const handlePasswordChange = ({target}) => {
        setRegisterPassword (target.value);
    }

    const handleNameChange = ({target}) => {
        setRegisterName (target.value);
    }

    const handleRegisterSubmit = () => {
        fetch("http://localhost:2000/register", {
            method: "post", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({
                email: registerEmail, 
                name: registerName, 
                password: registerPassword
            })
        })
        .then(resp => resp.json())
        .then(user => {
           if (user.id) {
                loadUser(user);
                onRouteChange("home");
            }

        }) 
    }

    return (
     <article className="mw6 center br3 pa3 pa4-ns mv3 ba b--black-50 shadow-5">

        <main className="pa4 black-80">
        <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 center">Register Form</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                <input onChange = {handleNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-170" type="text" name="name"  id="name" />
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange = {handleEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-170" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange = {handlePasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-170" type="password" name="password"  id="password" />
            </div>
            </fieldset>
            <div className="">
            <input  onClick = {handleRegisterSubmit}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" value="register" />
            </div>
        </div>
        </main>
     </article>


    )
}

export default Register;