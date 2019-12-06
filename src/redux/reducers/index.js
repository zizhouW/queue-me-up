import { combineReducers } from 'redux';
import { queueReducer } from './QueueReducers';
// import recommendationsReducer from '../features/recommendations/reducers';

const rootReducer = combineReducers({
  queueReducer,
});

export default rootReducer;
