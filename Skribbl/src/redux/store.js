import { createStore } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import HomeReducer from "./HomeReducer";

const store = createStore(HomeReducer, composeWithDevTools());

export default store;

