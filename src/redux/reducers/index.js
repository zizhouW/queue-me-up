import { combineReducers } from 'redux';
import { getQueueReducer, joinQueueReducer } from './QueueReducers';
// import recommendationsReducer from '../features/recommendations/reducers';

const rootReducer = combineReducers({
  getQueueReducer,
  joinQueueReducer,
});

export default rootReducer;
