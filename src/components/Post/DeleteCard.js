import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id)); 

  return (
    <div
      onClick={() => {
        if (window.confirm("Etes-vous sûr de vouloir supprimer ce post ?")) { //demande confirmation
          deleteQuote(); 
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="supprimer le post" />
    </div>
  );
};

export default DeleteCard;