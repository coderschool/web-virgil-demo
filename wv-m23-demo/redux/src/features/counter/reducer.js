const INCREMENT = "COUNTER.INCREMENT";
const DECREMENT = "COUNTER.DECREMENT";

const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  let newState;
  // console.log("dispatch action:", action);

  switch (action.type) {
    case INCREMENT:
      newState = { count: state.count + 1 };
      // console.log("State", newState);
      return newState;
    case DECREMENT:
      newState = { count: state.count - 1 };
      // console.log("State", newState);
      return newState;
    default:
      return state;
  }
};

export default counterReducer;
