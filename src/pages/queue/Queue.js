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
          ...doc.data(),
        });
      }
    });
  }
  handleJoinQueue() {
    // TODO: handle add use in collection
    // TODO: handle join queue
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <Button variant="contained" color="primary" onClick={this.handleJoinQueue}>
          Join Queue
        </Button>
      </div>
    )
  }
}

export default withRouter(Queue);
