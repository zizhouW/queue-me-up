import * as types from '../types/Queue';

const getQueueState = {
  queueData: {},
  isQueueDataLoading: false,
  queueDataError: null,
}

const joinQueueState = {
  joinQueueResponse: {},
  isJoinQueueLoading: false,
  joinQueueError: null,
};

const leaveQueueState = {
  leaveQueueResponse: {},
  isLeaveQueueLoading: false,
  leaveQueueError: null,
};

export const getQueueReducer = (state = getQueueState, action) => {
  switch(action.type) {
    case types.QUEUE_DATA_LOADING:
      return { ...state, isQueueDataLoading: action.payload, queueDataError: null };
    case types.QUEUE_DATA_SUCCESS:
      return { ...state, isQueueDataLoading: false, queueData: action.payload };
    case types.QUEUE_DATA_ERROR:
      return { ...state, isQueueDataLoading: false, queueDataError: action.payload };
    default:
      return state;
  }
}

export const joinQueueReducer = (state = joinQueueState, action) => {
  switch(action.type) {
    case types.JOIN_QUEUE_LOADING:
      return { ...state, isJoinQueueLoading: action.payload, joinQueueError: null };
    case types.JOIN_QUEUE_SUCCESS:
      return { ...state, isJoinQueueLoading: false, joinQueueResponse: action.payload };
    case types.JOIN_QUEUE_ERROR:
      return { ...state, isJoinQueueLoading: false, joinQueueError: action.payload };
    default:
      return state;
  }
}


export const leaveQueueReducer = (state = leaveQueueState, action) => {
  switch(action.type) {
    case types.LEAVE_QUEUE_LOADING:
      return { ...state, isLeaveQueueLoading: action.payload, leaveQueueError: null };
    case types.LEAVE_QUEUE_SUCCESS:
      return { ...state, isLeaveQueueLoading: false, leaveQueueResponse: action.payload };
    case types.LEAVE_QUEUE_ERROR:
      return { ...state, isLeaveQueueLoading: false, leaveQueueError: action.payload };
    default:
      return state;
  }
}
