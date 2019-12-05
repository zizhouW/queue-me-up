import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import firebase from '../../util/firebase';

class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.handleJoinQueue = this.handleJoinQueue.bind(this);
  }
  componentDidMount() {
    firebase.firestore().collection('queues').doc(this.props.match.params.queueId).onSnapshot((doc) => {
      if (doc.exists) {
        this.setState({
          ...Object.assign(doc.data(), { startTime: doc.data().startTime.seconds })
        });
      }
    });
  }
  handleJoinQueue() {
    // TODO: handle add use in collection
    // TODO: handle join queue
  }

  render() {
    const { name, users, startTime, maxTimespan, actionUserNumber } = this.state;
    return (
      <div>
        <h1>{name}</h1>
        <span>users: {users}</span>
        <span>startTime: {startTime}</span>
        <span>maxTimespan: {maxTimespan}</span>
        <span>actionUserNumber: {actionUserNumber}</span>
        <Button variant="contained" color="primary" onClick={this.handleJoinQueue}>
          Join Queue
        </Button>
      </div>
    )
  }
}

export default withRouter(Queue);
