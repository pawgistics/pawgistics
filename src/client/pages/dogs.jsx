// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import { getDogs } from '../api/volunteer';
import List from '../components/list';

type Props = {
  getDogs: () => Promise,
}

class DogsPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { dogs: [] };
    this.props.getDogs()
      .then((response) => {
        if (response.success) {
          this.setState({ dogs: response.response });
        } else {
          // eslint-disable-next-line no-console
          console.log(response.message);
        }
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('Failed to get response from server.');
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="6">
            <List items={this.state.dogs} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(null, dispatch => ({
  getDogs: () => dispatch(getDogs()),
}))(DogsPage);
