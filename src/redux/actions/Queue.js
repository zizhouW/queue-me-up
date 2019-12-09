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

const joinQueueLoading = (payload) => {
  return {
    type: types.JOIN_QUEUE_LOADING,
    payload
  }
};

const joinQueueSuccess = (payload) => {
  return {
    type: types.JOIN_QUEUE_SUCCESS,
    payload
  }
};

const joinQueueError = (payload) => {
  return {
    type: types.JOIN_QUEUE_ERROR,
    payload
  }
};

const leaveQueueLoading = (payload) => {
  return {
    type: types.LEAVE_QUEUE_LOADING,
    payload
  }
};

const leaveQueueSuccess = (payload) => {
  return {
    type: types.LEAVE_QUEUE_SUCCESS,
    payload
  }
};

const leaveQueueError = (payload) => {
  return {
    type: types.LEAVE_QUEUE_ERROR,
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
      let queueIndex = 0;
      dispatch(getQueueDataLoading(isLoading));
      dispatch(getQueueDataSuccess(Object.assign(doc.data(),
        {
          startTime: new Date(doc.data().startTime.seconds * 1000),
          users: doc.data().users.map(userName => {
            return {
              order: ++queueIndex,
              name: userName,
            };
          }),
        })
      ));
    }
  }, error => {
    isLoading = false;
    dispatch(getQueueDataLoading(isLoading));
    dispatch(getQueueDataError(error));
  });
};

const joinQueue = (queueId, userName) => (dispatch) => {
  if (!userName) return;

  let isLoading = true;
  dispatch(joinQueueLoading(isLoading));
  firebase.firestore().collection('queues').doc(queueId).update({
    users: firebase.firestore.FieldValue.arrayUnion(userName),
  }).then(response => {
    isLoading = false;
    dispatch(joinQueueLoading(isLoading));
    if (!response) {
      dispatch(joinQueueSuccess({ currentUser: userName }));
    } else {
      dispatch(joinQueueError('Something went wrong.'));
    }
  });
};

const leaveQueue = (queueId, userName) => (dispatch) => {
  if (!userName) return;

  let isLoading = true;
  dispatch(leaveQueueLoading(isLoading));
  firebase.firestore().collection('queues').doc(queueId).update({
    users: firebase.firestore.FieldValue.arrayRemove(userName),
  }).then(response => {
    isLoading = false;
    dispatch(leaveQueueLoading(isLoading));
    if (!response) {
      dispatch(joinQueueSuccess({ currentUser: null }));
      dispatch(leaveQueueSuccess({ message: 'Leaved successfully.'}));
    } else {
      dispatch(leaveQueueError('Something went wrong.'));
    }
  });
};

export { getQueueData, joinQueue, leaveQueue };
