import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React from "react";


const Auth = () => {

  
  const onSocialClick = async (e) => {
    const {target: {name, value}} = e;
    let provider;
    if(name === 'google'){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    if(name === 'github'){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  }
  
  return (
    <div>
        <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>Continue With Google</button>
        <button name="github" onClick={onSocialClick}>Continue With GitHub</button>
      </div>
    </div>
  )
}

export default Auth;