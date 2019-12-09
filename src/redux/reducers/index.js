import { combineReducers } from 'redux';
import { getQueueReducer, joinQueueReducer, leaveQueueReducer } from './QueueReducers';
// import recommendationsReducer from '../features/recommendations/reducers';

const rootReducer = combineReducers({
  getQueueReducer,
  joinQueueReducer,
  leaveQueueReducer,
});

export default rootReducer;
