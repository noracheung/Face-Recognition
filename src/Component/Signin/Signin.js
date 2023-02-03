import React, { useState } from 'react';

function Signin ({onRouteChange, loadUser}) {

    const[signInEmail, setSignInEmail] = useState("");
    const[signInPassword, setSignInPassword] = useState("");

    const handleEmailChange = ({target}) => {
        setSignInEmail(target.value);
    }

    const handlePasswordChange = ({target}) => {
        setSignInPassword(target.value);
    }

    const handleSubmitSignIn = () => {
        //console.log(signInEmail, signInPassword)
        fetch("http://localhost:2000/signin", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: signInEmail, 
                password: signInPassword
            })
        })
        .then(resp => resp.json())
        .then(user => {
            if (user.id) {
                loadUser(user)
                console.log(user)
                onRouteChange("home")
                
            }
        })
    }

    return (
     <article className="mw6 center br3 pa3 pa4-ns mv3 ba b--black-50 shadow-5">

        <main className="pa4 black-80">
        <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange = {handleEmailChange} value={signInEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-170" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange = {handlePasswordChange} value={signInPassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-170" type="password" name="password"  id="password" />
            </div>
            </fieldset>
            <div className="">
            <input  onClick = {handleSubmitSignIn}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" value="Sign in" />
            </div>
            <div className="lh-copy mt3">
            <a href="#0" onClick = {() => onRouteChange("register")}className="f6 link dim black db">Register</a>
            </div>
        </div>
        </main>
     </article>


    )
}

export default Signin;