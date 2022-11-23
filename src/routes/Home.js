import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection("nweets").get();
  //   dbNweets.forEach((document)=> {
  //     const nweetObj = {
  //       ...document.data(),
  //       id: document.id,
  //     }
  //     setNweets((prev) => [nweetObj,...prev])
  //   })
  // };

  useEffect(()=> {
    // getNweets();
    dbService.collection('nweets').onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})); //map : does not re-render
      setNweets(nweetArray);
    })
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if(attachment !== ""){
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
  
      attachmentUrl = await response.ref.getDownloadURL(); 
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl 
    }
    dbService.collection('nweets').add(nweetObj);
    setNweet("");
    setAttachment("");
  }

  const onChange = (e) =>{
    const {target : {value}} = e;
    setNweet(value);
  }

  const onFileChange = (e) => {
    const {target: {files}} = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (e) =>{
      const {currentTarget: {result}} = e;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = (e) => {
    setAttachment(null)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange}/>
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width='50px' height='50px' alt="attachment"/>
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((n)=>
          <Nweet key={n.id} nweetObj={n} isOwner={n.creatorId === userObj.uid}/>
        )}

      </div>
    </div>
  )
};


export default Home;