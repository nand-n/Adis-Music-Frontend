import { combineReducers } from "redux";
import postReducer from "./postReducer/postReducer";
import songReducer from "../Songs/songReducer";
// import postReducer from "./postsReducer/postsReducer";

const rootReducer = combineReducers({
  postReducer: postReducer,
  songReducer:songReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
