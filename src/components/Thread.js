// Page de gestion du fil d'actu

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true); 
  const [count, setCount] = useState(5); 
  const dispatch = useDispatch();  
  const posts = useSelector((state) => state.postReducer); 

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 > // 
      document.scrollingElement.scrollHeight // Au scrolle vers le bas on passe le setLoadPost sur true
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) { 
      dispatch(getPosts(count)); // Appelle dispatch et passe count en parametres
      setLoadPost(false); 
      setCount(count + 5); 
    }

    window.addEventListener("scroll", loadMore); // Au scroll on lance loadMore
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) && 
          posts.map((post) => { 
            return <Card post={post} key={post._id} />; 
          })}
      </ul>
    </div>
  );
};

export default Thread;