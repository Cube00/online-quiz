const defaultState = {
  data: "",
  category: "",
  difficulty: "",
};

const reducer = (state = defaultState, action) => {
  if (action.type === "SET_DATA") {
    return { ...state, data: action.content };
  }
  if (action.type === "SET_CATEGORY") {
    return {
      ...state,
      category: { id: action.categoryId, name: action.categoryName },
    };
  }
  if (action.type === "SET_DIFFICULTY") {
    return {
      ...state,
      difficulty: action.diffName,
    };
  }
  return state;
};

export default reducer;
