// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { apiTestVolunteer } from '../api/volunteer';

type Props = {
  apiTestVolunteer: () => Promise,
}

class HomePage extends React.Component<Props> {
  constructor() {
    super();
    this.state = { message: 'Home Page' };

    this.handleApiTest = this.handleApiTest.bind(this);
  }

  handleApiTest() {
    this.props.apiTestVolunteer()
      .then((response) => {
        this.setState({ message: response.message });
      })
      .catch(() => {
        this.setState({ message: 'Failed to get response from server.' });
      });
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <Button onClick={this.handleApiTest}>Say hello to the server!</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({ apiTestVolunteer: () => dispatch(apiTestVolunteer()) });

export default connect(null, mapDispatchToProps)(HomePage);
