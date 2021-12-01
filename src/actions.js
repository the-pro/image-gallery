export const create = "CREATE_COLLECTION";
export const remove = "DELETE_COLLECTION";
export const edit = "EDIT_COLLECTION"

export const CreateNewCollection = (collection) => {
  return {
    type: create,
    collection
  };
};

export const RemoveCollection = (collection) => {
  return {
    type: remove,
    collection
  };
};

export const EditCollection = (collection) => {
  return {
    type: edit,
    collection
  };
};
