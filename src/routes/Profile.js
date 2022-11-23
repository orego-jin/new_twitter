import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const Profile = ({refreshUser, userObj}) => {
  const history = useHistory();
  const [displayName, setDisplayName] = useState(userObj.displayName);

  const onLogOutClick = ()=> {
    authService.signOut();
    history.push("/");
  };
  
  const getMyNweets = async () => {
    const nweets = await dbService.collection('nweets').where("creatorId","==",userObj.uid).orderBy("createdAt").get();
    console.log(nweets.docs.map((doc) => doc.data()));
  }

  const onChange = (e) => {
    e.preventDefault();
    const {target: {value}} = e;
    setDisplayName(value);
  }

  const onSubmit = async (e) => {
    if(userObj.displayName !== displayName){
      //update displayName in Firebase
      await userObj.updateProfile({displayName: displayName});
      //update displayName in react
      refreshUser();
    }
  }

  useEffect(() => {
    getMyNweets();
   })

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={displayName} type="text" placeholder="display name" />
        <input type="submit" value="update profile"/> 
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
};

export default Profile;