import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import counterReducer from "../features/counter/reducer";
import multiCounterReducer from "../features/multiCounter/reducer";
import todoReducer from "../features/todo/reducer";

const initialState = {};
const store = createStore(
  combineReducers({
    counter: counterReducer,
    multiCounter: multiCounterReducer,
    todo: todoReducer,
  }),
  initialState,
  composeWithDevTools()
);

export default store;
