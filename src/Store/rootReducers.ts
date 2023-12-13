import { combineReducers } from 'redux';
import songReducer from './Songs/songReducer'; // Import your reducer

const rootReducer = combineReducers({
    songReducer:songReducer
});

export default rootReducer;