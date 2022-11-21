import { dbService } from 'fbase';
import React, {useState} from 'react';




const Nweet = ({nweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const [] = useState();
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure to delete this nweet?");
    if(ok){
      //delete nweet
      dbService.doc(`nweets/${nweetObj.id}`).delete();
      console.log(ok )
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(nweetObj, newNweet)
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet
    });
    setEditing(false);
  }
  const toggleEditing = () => {setEditing(prev => !prev)};
  const onChange = (e) => {
    const {target: {value}} = e;
    setNewNweet(value);
  
  }
  return (
    <div> 
      {
      editing? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Edit your nweet" value={newNweet} required/>
            <input type="submit" value="Update Nweet"/>
          </form>
          <button onClick={toggleEditing}>Cancel</button> 
        </>
      )
      : 
        (<>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
          <>
            <button onClick={onDeleteClick}>Delete Nweet</button>
            <button onClick={toggleEditing}>Edit Nweet </button>
          </>
          )}
        </>)
      }
  </div>
  )
}

export default Nweet;