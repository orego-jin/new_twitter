import { authService } from "fbase";
import React, {useState} from "react";

const AuthForm = () => {
  
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
      if(newAccount){  
        //create Account
        await authService.createUserWithEmailAndPassword(
          email, password
        )
      }
      else {
        //log in
        await authService.signInWithEmailAndPassword(
          email, password
        )
      }
    } catch(error){
        console.log(error)
        setError(error.message)
    }
    
  }

  const toggleAccount = () => {setNewAccount((prev) => !prev)}
  return (
    <>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
        <input type="submit" value={newAccount? "Create Account" : "Log In"} />
      </form>
      <span onClick={toggleAccount}>{newAccount? "Sign in" :"Create Account"} </span>
    </>
  )
}

export default AuthForm;