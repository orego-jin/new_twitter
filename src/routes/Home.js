import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fbase";
import React, {useEffect, useState} from "react";

const Home = ({userObj}) => {
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

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((n)=>
          <Nweet key={n.id} nweetObj={n} isOwner={n.creatorId === userObj.uid}/>
        )}

      </div>
    </div>
  )
};

export default Home;