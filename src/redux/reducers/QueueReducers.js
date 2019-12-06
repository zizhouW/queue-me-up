import * as types from '../types/Queue';

const initialState = {
  queueData: {},
  isQueueDataLoading: false,
  queueDataError: null,
}

export const queueReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.QUEUE_DATA_LOADING:
      return { ...state, isQueueDataLoading: action.payload };
    case types.QUEUE_DATA_SUCCESS:
      return { ...state, isQueueDataLoading: false, queueData: action.payload };
    case types.QUEUE_DATA_ERROR:
      return { ...state, isQueueDataLoading: false, queueDataError: action.payload };
    default:
      return state;
  }
}
