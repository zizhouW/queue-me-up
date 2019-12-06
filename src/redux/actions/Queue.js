import * as types from '../types/Queue';
import firebase from '../../util/firebase';

const getQueueDataLoading = (payload) => {
  return {
    type: types.QUEUE_DATA_LOADING,
    payload
  }
};

const getQueueDataSuccess = (payload) => {
  return {
    type: types.QUEUE_DATA_SUCCESS,
    payload
  }
};

const getQueueDataError = (payload) => {
  return {
    type: types.QUEUE_DATA_ERROR,
    payload
  }
};

const getQueueData = (queueId) => (dispatch) => {
  if (!queueId) return;

  let isLoading = true;
  dispatch(getQueueDataLoading(isLoading));
  firebase.firestore().collection('queues').doc(queueId).onSnapshot((doc) => {
    if (doc.exists) {
      isLoading = false;
      dispatch(getQueueDataLoading(isLoading));
      dispatch(getQueueDataSuccess(Object.assign(doc.data(),
        { startTime: doc.data().startTime.seconds })));
    }
  }, error => {
    isLoading = false;
    dispatch(getQueueDataLoading(isLoading));
    dispatch(getQueueDataError(error));
  });
};

export default getQueueData;
