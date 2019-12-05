import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormControl, InputLabel, Input, Button, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import firebase from '../../util/firebase';
import './CreateQueue.scss';

class CreateQueue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queueName: '',
      startTime: new Date(),
      maxTimespan: 5,
      actionUserNumber: 1,
      error: '',
    };
    this.handleCreateQueue = this.handleCreateQueue.bind(this);
    this.handleQueueNameChange = this.handleQueueNameChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleMaxTimespanChange = this.handleMaxTimespanChange.bind(this);
    this.handleActionUserNumberChange = this.handleActionUserNumberChange.bind(this);
  }

  handleCreateQueue() {
    const { queueName, startTime, maxTimespan, actionUserNumber, error} = this.state;
    if (startTime <= new Date()) {
      this.setState({
        error: 'Start time can not be in the past',
      });
      return;
    } else {
      this.setState({
        error: null,
      });
    }

    if (!error) {
      // TODO: option to replace n people after each queue action
      firebase.firestore().collection('queues').add({
        name: queueName,
        users: [],
        startTime,
        maxTimespan,
        actionUserNumber,
      }).then((res) => {
        firebase.firestore().collection('queues').doc(res.id).onSnapshot((doc) => {
          if (doc.exists) {
            this.props.history.push(`/queue/${doc.id}`);
          }
        });
      });
    }
  }

  handleQueueNameChange(event) {
    if (event && event.target) {
      this.setState({
        queueName: event.target.value,
      });
    }
  }

  handleStartTimeChange(startDateTime) {
    this.setState({
      error: '',
      startTime: startDateTime,
    });
  }

  handleMaxTimespanChange(event) {
    if (event && event.target) {
      this.setState({
        maxTimespan: event.target.value,
      });
    }
  }

  handleActionUserNumberChange(event) {
    if (event && event.target) {
      this.setState({
        actionUserNumber: event.target.value,
      });
    }
  }

  render() {
    return (
      <div className="create-queue-container">
        <h1>Create Queue</h1>
        {this.state.error && <div className="form-error">{this.state.error}</div>}
        <FormControl>
          <InputLabel htmlFor="input-name">Queue Name</InputLabel>
          <Input id="input-name" value={this.state.queueName} onChange={this.handleQueueNameChange} />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="Start Time"
              value={this.state.startTime}
              onChange={this.handleStartTimeChange}
              disablePast
              format="yyyy-MM-dd  HH:mm"
            />
          </MuiPickersUtilsProvider>
          <TextField
            label="Timespan per queue (minutes)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            value={this.state.maxTimespan}
            onChange={this.handleMaxTimespanChange}
          />
          <TextField
            label="# of people in action"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            value={this.state.actionUserNumber}
            onChange={this.handleActionUserNumberChange}
          />
          <Button variant="contained" color="primary" onClick={this.handleCreateQueue}>
            Submit
          </Button>
        </FormControl>
      </div>
    )
  }
}

export default withRouter(CreateQueue);
