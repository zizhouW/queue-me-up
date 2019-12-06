import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import getQueueData from '../../redux/actions/Queue';

class Queue extends Component {
  constructor(props) {
    super(props);

    this.handleJoinQueue = this.handleJoinQueue.bind(this);
  }
  componentDidMount() {
    // this.props.getQueueData();
  }
  handleJoinQueue() {
    // TODO: handle add use in collection
    // TODO: handle join queue
  }

  render() {
    const { queueData, isLoading, queueDataError } = this.props;
    const timeNow = new Date();
    if (isLoading) {
      return <span>Loading...</span>;
    } else if (queueDataError) {
      return <span>error getting queue data</span>;
    }

    return (
      <div>
        <h1>{queueData.name}</h1>
        <span>users: {queueData.users}</span>
        <span>startTime: {queueData.startTime}</span>
        <span>maxTimespan: {queueData.maxTimespan}</span>
        <span>actionUserNumber: {queueData.actionUserNumber}</span>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleJoinQueue}
          disabled={queueData.startTime && new Date(queueData.startTime) > timeNow}
        >
          Join Queue
        </Button>
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
};

Queue.defaultProps = {
  queueDataError: '',
};

const mapStateToProps = state => {
  return {
    queueData: state.queueReducer.queueData,
    isLoading: state.queueReducer.isQueueDataLoading,
    queueDataError: state.queueReducer.queueDataError,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getQueueData: dispatch(getQueueData(ownProps.match.params.queueId)),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Queue));
