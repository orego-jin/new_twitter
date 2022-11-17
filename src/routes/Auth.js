import { authService, firebaseInstance } from "fbase";
import React, {useState} from "react";


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassward] = useState(""); 
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  
  const onChange = (e) => {
    const {target: {name, value}} = e;
    if(name === "email"){
      setEmail(value)
    }
    if(name === "password"){
      setPassward(value)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if(newAccount){  
        //create Account
        data = await authService.createUserWithEmailAndPassword(
          email, password
        )
      }
      else {
        //log in
        data = await authService.signInWithEmailAndPassword(
          email, password
        )
      }
      console.log(data);
    } catch(error){
        console.log(error)
        setError(error.message)
    }
    
  }

  const toggleAccount = () => {setNewAccount((prev) => !prev)}
  const onSocialClick = async (e) => {
    const {target: {name, value}} = e;
    let provider;
    if(name === 'google'){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    if(name === 'github'){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data)
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
        <input type="submit" value={newAccount? "Create Account" : "Log In"} />
      </form>
      <span onClick={toggleAccount}>{newAccount? "Sign in" :"Create Account"} </span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue With Google</button>
        <button name="github" onClick={onSocialClick}>Continue With GitHub</button>
      </div>
      <div>{error}</div>
    </div>
  )
}
export default Auth;