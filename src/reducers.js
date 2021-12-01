import { create,edit,remove } from "./actions";

const initialCollectionState = [];
export default function collectionReducer (state = initialCollectionState, action) {
  if (action.type === create) {
    return [...state,action.collection]
  }
  if (action.type === remove) {
    return state.filter((val) => val.id !== action.collection.id)
  }

  if (action.type === edit) {
    return state.map((val) => {
      if(val.id === action.collection.id) {
        return action.collection
      }

      return val
    })
  }

  return state;
};

