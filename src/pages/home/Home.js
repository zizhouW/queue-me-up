import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Home extends Component {
  handleRedirectCreateQueue = () => {
    this.props.history.push('/create');
  }

  render() {
    return (
      <div>
        <h1>Queue me up</h1>
        <Button variant="contained" color="primary" onClick={this.handleRedirectCreateQueue}>
          Create Queue
        </Button>
      </div>
    )
  }
}

export default withRouter(Home);
