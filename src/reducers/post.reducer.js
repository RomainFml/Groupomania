import {
    DELETE_POST,
    GET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    UPDATE_POST,
    UPDATE_IMAGE,
  } from "../actions/post.actions";
  
  const initialState = {}; // initialState est vide par défault pour y stocker de la data
  
  export default function postReducer(state = initialState, action) { // Création du store stock de initialSate
    switch (action.type) {
      case GET_POSTS: 
        return action.payload;
      case LIKE_POST:
        return state.map((post) => {
          if (post._id === action.payload.postId) { // s'assure de la correspondance post ID et Payload post ID
            return {
              ...post,
              likers: [action.payload.userId, ...post.likers],
            };
          }
          return post;
        });
      case UNLIKE_POST:
        return state.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              likers: post.likers.filter((id) => id !== action.payload.userId),
            };
          }
          return post;
        });
  
      case UPDATE_POST:
        return state.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              message: action.payload.message,
            };
          } else return post;
        });
  
      case UPDATE_IMAGE:
        return state.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              picture: action.payload.picture,
            };
          } else return post;
        });
        
      case DELETE_POST:
        return state.filter((post) => post._id !== action.payload.postId);
      default:
        return state;
    }
  }