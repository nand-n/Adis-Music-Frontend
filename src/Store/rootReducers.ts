import { combineReducers } from 'redux';
import songReducer from './Songs/songReducer'; // Import your reducer

const rootReducer = combineReducers({
    songReducer
});
export type RootReducerState = ReturnType<typeof rootReducer>;
export default rootReducer;