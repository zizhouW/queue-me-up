import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { getQueueData, joinQueue, leaveQueue } from '../../redux/actions/Queue';
import './Queue.scss';

class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
    };

    this.handleJoinQueue = this.handleJoinQueue.bind(this);
    this.handleLeaveQueue = this.handleLeaveQueue.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  componentWillUnmount() {
    if (this.props.joinQueueResponse.currentUser) {
      this.props.onLeaveQueue(this.props.joinQueueResponse.currentUser);
    }
  }

  handleJoinQueue() {
    if (this.state.userName) {
      this.props.onJoinQueue(this.state.userName);
    }
  }

  handleLeaveQueue() {
    this.setState({
      userName: '',
    });
    if (this.props.joinQueueResponse.currentUser) {
      this.props.onLeaveQueue(this.props.joinQueueResponse.currentUser);
    }
  }

  handleUsernameChange(e) {
    if (e && e.target) {
      this.setState({
        userName: e.target.value,
      });
    }
  }

  render() {
    const { queueData, isLoading, queueDataError, joinQueueResponse, isJoinQueueLoading,
      joinQueueError, isLeaveQueueLoading, leaveQueueError } = this.props;
    const timeNow = new Date();
    if (isLoading) {
      return <span>Loading...</span>;
    } else if (queueDataError) {
      return <span>{queueDataError}</span>;
    }

    let usersInAction = [];
    let usersInQueue = [];
    if (queueData.users && queueData.users.length > 0) {
      usersInAction = usersInAction.concat(queueData.users);
      usersInQueue = usersInAction.splice(queueData.actionUserNumber);
    }

    let subTitle = null;
    let mainContent = null;
    if (queueData.startTime && new Date(queueData.startTime) > timeNow) {
      subTitle = (
        <span className="queue-subtitle queue-subtitle--not-live">
          You cannot joing this queue yet because it has not been started,
          please come back after <strong>{queueData.startTime.toString()}</strong>.
        </span>
      );
    } else if (queueData.startTime) {
      subTitle = (
        <span className="queue-subtitle">
          This queue is now live, enter your name below and join the queue before others!
        </span>
      );
      mainContent = (
        <div className="queue-main-content">
          <div className="action-list-users">
            <div className="action-list-users__title">Users in action (limit {queueData.actionUserNumber})</div>
            {usersInAction.length > 0 ? usersInAction.map(user => {
              return (
                <div className="action-list-user" key={user.name}>
                  <div className="action-list-user__name">{user.name}</div>
                </div>
              );
            }) : <span className="action-list-users-placeholder">Nobody is in queue. Join now to be the first!</span>}
          </div>
          {usersInQueue.length > 0 &&
            <div className="queue-list-users">
            <div className="queue-list-users__title">Up next</div>
              {usersInQueue.map(user => {
                return (
                  <div className="queue-list-user" key={user.name}>
                    <div className="queue-list-user__order">{user.order}</div>
                    <div className="queue-list-user__name">{user.name}</div>
                  </div>
                );
              })}
            </div>
          }
          {joinQueueResponse.currentUser &&
            <div className="queue-joined-as">
              You are in queue as:
              <span className="queue-joined-as__name"> {joinQueueResponse.currentUser}</span>
            </div>
          }
          <div className="queue-action-form">
            {joinQueueResponse.currentUser ? (
              <Button
                variant="contained"
                color="secondary"
                className="queue-action-form__button"
                onClick={this.handleLeaveQueue}
                disabled={isLeaveQueueLoading}
              >
                Leave Queue
              </Button>
            ) : (
              <FormControl>
                <InputLabel htmlFor="input-name">Enter name</InputLabel>
                <Input
                  id="input-name"
                  className="queue-action__username-input"
                  value={this.state.userName}
                  onChange={this.handleUsernameChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="queue-action-form__button"
                  onClick={this.handleJoinQueue}
                  disabled={queueData.startTime && new Date(queueData.startTime) > timeNow || isJoinQueueLoading}
                >
                  Join Queue
                </Button>
              </FormControl>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="queue-container">
        <div className="queue-name">{queueData.name}</div>
        {subTitle}
        {mainContent}
      </div>
    )
  }
};

Queue.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      queueId: PropTypes.string,
    }),
  }).isRequired,
  // from mapStateToProps
  queueData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  queueDataError: PropTypes.string,
  joinQueueResponse: PropTypes.object.isRequired,
  isJoinQueueLoading: PropTypes.bool.isRequired,
  joinQueueError: PropTypes.string,
  leaveQueueResponse: PropTypes.object.isRequired,
  isLeaveQueueLoading: PropTypes.bool.isRequired,
  leaveQueueError: PropTypes.string,
};

Queue.defaultProps = {
  queueDataError: '',
  joinQueueError: '',
  leaveQueueError: '',
};

const mapStateToProps = state => {
  return {
    queueData: state.getQueueReducer.queueData,
    isLoading: state.getQueueReducer.isQueueDataLoading,
    queueDataError: state.getQueueReducer.queueDataError,
    joinQueueResponse: state.joinQueueReducer.joinQueueResponse,
    isJoinQueueLoading: state.joinQueueReducer.isJoinQueueLoading,
    joinQueueError: state.joinQueueReducer.joinQueueError,
    leaveQueueResponse: state.leaveQueueReducer.leaveQueueResponse,
    isLeaveQueueLoading: state.leaveQueueReducer.isLeaveQueueLoading,
    leaveQueueError: state.leaveQueueReducer.leaveQueueError,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getQueueData: dispatch(getQueueData(ownProps.match.params.queueId)),
    onJoinQueue: (name => {
      dispatch(joinQueue(ownProps.match.params.queueId, name));
    }),
    onLeaveQueue: (name => {
      dispatch(leaveQueue(ownProps.match.params.queueId, name));
    }),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Queue));
