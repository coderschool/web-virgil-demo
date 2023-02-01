export const ADD_TODO = "TODO.ADD";
export const TOGGLE_TODO = "TODO.TOGGLE";
export const SET_FILTER = "TODO.SET_FILTER";

const initialState = {
  todos: [],
  filter: "SHOW_ALL",
};

const todoReducer = (state = initialState, action) => {
  console.log("dispatch action:", JSON.stringify(action, null, 2));
  const { type, payload } = action;
  let newState;
  switch (type) {
    case ADD_TODO:
      newState = {
        ...state,
        todos: [
          ...state.todos,
          { id: payload.id, text: payload.text, completed: false },
        ],
      };
      console.log("State", JSON.stringify(newState, null, 2));
      return newState;
    case TOGGLE_TODO:
      newState = {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== payload.id) return todo;
          return { ...todo, completed: !todo.completed };
        }),
      };
      console.log("State", JSON.stringify(newState, null, 2));
      return newState;
    case SET_FILTER:
      newState = {
        ...state,
        filter: payload,
      };
      console.log("State", JSON.stringify(newState, null, 2));
      return newState;
    default:
      return state;
  }
};

export default todoReducer;
