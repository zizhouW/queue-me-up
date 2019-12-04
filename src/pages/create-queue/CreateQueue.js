import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import firebase from '../../util/firebase';

class CreateQueue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queueName: '',
    };
    this.handleCreateQueue = this.handleCreateQueue.bind(this);
    this.handleQueueNameChange = this.handleQueueNameChange.bind(this);
  }

  handleCreateQueue() {
    // TODO: Add empty user list in doc
    firebase.firestore().collection('queues').add({
      name: this.state.queueName,
    }).then((res) => {
      firebase.firestore().collection('queues').doc(res.id).onSnapshot((doc) => {
        if (doc.exists) {
          this.props.history.push(`/queue/${doc.id}`);
        }
      });
    });
  }

  handleQueueNameChange(event) {
    if (event && event.target) {
      this.setState({
        queueName: event.target.value,
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Create Queue</h1>
        <FormControl>
          <InputLabel htmlFor="input-name">Name</InputLabel>
          <Input id="input-name" value={this.state.queueName} onChange={this.handleQueueNameChange} />
          <Button variant="contained" color="primary" onClick={this.handleCreateQueue}>
            Submit
          </Button>
        </FormControl>
      </div>
    )
  }
}

export default withRouter(CreateQueue);
