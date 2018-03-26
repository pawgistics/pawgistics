// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Input } from 'reactstrap';

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
      .then((dogs) => {
        this.setState({ dogs });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} xs="12">
            <Input type="text" name="dog_filter" className="mb-3" placeholder="Filter dogs..." />
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
