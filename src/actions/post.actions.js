import axios from "axios";

// posts et actions
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_IMAGE = "UPDATE_IMAGE";

export const GET_POST_ERRORS = "GET_POST_ERRORS";


// Recupère et dispatch des posts
export const getPosts = (num) => { 
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num); 
        dispatch({ type: GET_POSTS, payload: array }); /// On renvoie le contenu de array dans le payload
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`http://localhost:5000/api/post/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
  };
};

export const likePost = (postId, userId) => { // On passe l'ID du post et du user
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `http://localhost:5000/api/post/like-post/` + postId, 
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};


export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `http://localhost:5000/api/post/unlike-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};


export const updatePost = (postId, message) => { 
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:5000/api/post/${postId}`, 
      data: { message },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updateImage = (postId, fileData) => {
  return (dispatch) => {
    return axios.put(`http://localhost:5000/api/post/update-image/${postId}`, fileData, {
      withCredentials: true,
    }).then((res) => {
        dispatch({ type: UPDATE_IMAGE, payload: { picture: res.data.picture, postId } });
      })
      .catch((err) => console.log(err));
  };
}


export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({ // Envoie une requête delete sur cette url 
      method: "delete",
      url: `http://localhost:5000/api/post/${postId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};