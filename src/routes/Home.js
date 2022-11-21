import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, {useEffect, useState} from "react";

const Home = ({userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

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
    dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid
    });
    setNweet("");
  }

  const onChange = (e) =>{
    const {target : {value}} = e;
    setNweet(value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Nweet" />
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