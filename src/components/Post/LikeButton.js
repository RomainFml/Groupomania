import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false); 
  const uid = useContext(UidContext);
  const dispatch = useDispatch()

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true)
  }
  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false)
  }

  useEffect(() => { 
    if (post.likers.includes(uid)) setLiked(true) // Si post.likers donne l'ID d'un utilisateur setLiked passe true
    else setLiked(false)
  }, [uid, post.likers, liked]);

  return ( 
    <div className="like-container">
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="bouton j'aime" /> 
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="bouton je n'aime plus" /> 
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;