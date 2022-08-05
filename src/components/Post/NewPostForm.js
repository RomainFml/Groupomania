import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";

const NewPostForm = () => {
    const [message, setMessage] = useState(""); 
    const [postPicture, setPostPicture] = useState(null); 
    const [file, setFile] = useState(); // Fichier d'image pour database
    const userData = useSelector((state) => state.userReducer); 
    const dispatch = useDispatch();

    // envoi de la publication au Backend
    const handlePost = () => {
        if (message || postPicture) { 
            const data = new FormData();  
            data.append("posterId", userData._id);
            data.append("message", message);
            if (file) data.append("file", file);

            dispatch(addPost(data)); 
            dispatch(getPosts()); 
            cancelPost();
        } else {
            alert("Veuillez rédiger un message");
        }
    };

    // Réinitialisation du champs texte
    const cancelPost = () => {  
        setMessage("");
        setPostPicture("");
        setFile("");
    };

    // Variable  pour afficher l'img en prévisualisation 
    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0])); 
        setFile(e.target.files[0]); 
    };

    return (
        <div className="post-container">
            <>
                <div className="post-form">
                    <textarea 
                        name="message"
                        id="message"
                        placeholder="..."
                        onChange={(e) => setMessage(e.target.value)} 
                        value={message}
                    />
                    { postPicture ? ( // Prévisualisation de l'image 
                        <li className="card-container">
                            <div className="card-right">
                                <div className="content">                                    
                                    <img
                                        src={postPicture}
                                        alt=''
                                    />
                                </div>
                            </div>
                        </li>
                    ) : null}
                    <div className="footer-form">
                        <div className="icon">
                            <>
                                <img
                                    src="./img/icons/picture.svg"
                                    alt="icone d'upload de fichier"
                                />
                                <input
                                    aria-label="upload-picture"
                                    type="file"
                                    id="file-upload"
                                    name="file"
                                    accept=".jpg, .jpeg, .png" 
                                    onChange={(e) => handlePicture(e)} 
                                />
                            </>
                        </div>
                        <div className="btn-send">
                            <button className="cancel" onClick={cancelPost}>Annuler message</button>    {/*Au clique on déclanche cancelPost pour effacer*/}
                            <button className="send" onClick={handlePost}>Envoyer</button>    {/*Au clique on déclanche handlePost pour transmettre au back*/}
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default NewPostForm;