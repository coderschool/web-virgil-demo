export const ADD_COUNTER = "MULTI_COUNTER.ADD";
export const INCREMENT = "MULTI_COUNTER.INCREMENT";
export const DECREMENT = "MULTI_COUNTER.DECREMENT";

const initialState = [];

const multiCounterReducer = (state = initialState, action) => {
  // console.log("dispatch action:", JSON.stringify(action, null, 2));
  const index = action.payload?.index;
  let newState;

  switch (action.type) {
    case ADD_COUNTER:
      newState = [...state, { count: 0 }];
      // console.log("State", JSON.stringify(newState));
      return newState;

    case INCREMENT:
      newState = [
        ...state.slice(0, index),
        {
          count: state[index].count + 1,
        },
        ...state.slice(index + 1),
      ];
      // console.log("State", JSON.stringify(newState));
      return newState;

    case DECREMENT:
      newState = [
        ...state.slice(0, index),
        {
          count: state[index].count - 1,
        },
        ...state.slice(index + 1),
      ];
      // console.log("State", JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
};

export default multiCounterReducer;
