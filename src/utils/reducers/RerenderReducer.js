const rerenderReducer = (state = false, action) => {
  switch (action.type) {
    case "RE_RENDER":
      return (state = !state);
    default:
      return state;
  }
};

export default rerenderReducer;
