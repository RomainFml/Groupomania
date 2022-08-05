import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateImage, updatePost } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

const Card = ({post}) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [postPicture, setPostPicture] = useState(null); 
  const [file, setFile] = useState(); // Fichier d'images envoyé à la database

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch(); 

  const updateItem = () => { 
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelImageUpdate = () => {
    setPostPicture(null);
    setFile(null);
  }

  const handleImageUpdate = () => {
    if (postPicture && file) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("file", file);

      dispatch(updateImage(post._id, data));
      cancelImageUpdate();
  } else {
      alert("veuillez choisir une image");
  }
  };
  
  return (
    <li className="card-container" key={post._id}>
        <i className="test"/>
          <>
            <div className="card-left">
            </div>
            <div className="card-right">
              <div className="card-header">
                <div className="pseudo">
                  <h3>
                    {!isEmpty(usersData[0]) && //si isEmpty userdata n'est pas vide : 
                      usersData
                        .map((user) => { //On mape les données utilisateurs
                          if (user._id === post.posterId) return user.pseudo; //on s'assure que user ID = Poster ID
                          else return null;
                        })
                        .join("")}
                  </h3>
                  <span>{dateParser(post.createdAt)}</span> {/*Appelle la fonction qui donne la date*/}
                </div>
              </div>
              <br />
              {isUpdated === false && <p>{post.message}</p>} {/*Si isUpdated est false on affiche le message*/}
              {isUpdated && (  // Si il est true on affiche textarea pour modifier le post
                <div className="update-post">
                  <textarea
                    defaultValue={post.message} 
                    onChange={(e) => setTextUpdate(e.target.value)} 
                  />
                  <div className="button-container">
                    <button className="btn" onClick={updateItem}> {/*onClick sur btn on lancera updateItem*/}
                      Valider Modifications
                    </button>
                  </div>
                </div>
              )}
              {(postPicture || post.picture) && (
                <img src={postPicture || post.picture} alt="contenu du post" className="card-pic"/>
              )}
              {(userData._id === post.posterId || userData.isAdmin === true) && ( //droits accordés si user d'origine ou admin
                <div className={`button-container ${postPicture ? 'update-image' : ''}`}>
                  {post.picture && (
                    <>
                      <div>
                        <span className="icon">
                          <img src="./img/icons/photo-editor.svg" alt=""/>
                          <input
                            aria-label="upload-picture"
                            type="file"
                            id="file-upload"
                            name="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => handlePicture(e)}
                          />
                        </span>
                      </div>
                      {postPicture ? (
                        <div>
                          <button onClick={cancelImageUpdate}>Cancel</button>
                          <button onClick={handleImageUpdate}>Update Image</button>
                        </div>
                      ) : null}
                    </>
                  )}
                  <div onClick={() => setIsUpdated(!isUpdated)}> {/*Change la valeur au click sur le btn*/}
                    <img src="./img/icons/edit.svg" alt="modifier le post"/>
                  </div>
                  <DeleteCard id={post._id}/>  {/*Component de suppression de poste*/}
                </div>
              )}
              <div className="card-footer">
                <LikeButton post={post} />
              </div>
            </div>
          </>
        
      </li>
  );
};

export default Card;