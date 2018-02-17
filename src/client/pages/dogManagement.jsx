// @flow

import React from 'react';
import { connect } from 'react-redux';
// import CSSModules from 'react-css-modules';
import { Label, Container, Col, Row, InputGroup, InputGroupAddon, FormGroup, Input, Button } from 'reactstrap';

import { getDogs } from '../api/volunteer';
import DogDetailTable from '../containers/dog-detail-table';

// import styles from '../styles/pages/dogManagement.m.scss';
// need to change this later!!
// ^ whose comment is this?

type Props = {
  getDogs: () => Promise,
}

class DogManagementPage extends React.Component<Props> {
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
        <Col xl="8" lg="9" md="10" sm="11" xs="12">
          <Row className="mb-2">
            <h1>Dog Management Page</h1>
          </Row>
          <Row className="mb-2">
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" />Active
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" />Available for check out
              </Label>
            </FormGroup>
          </Row>
          <Row className="mb-4">
            <InputGroup>
              <Input type="text" className="form-control" placeholder="Search using keywords" id="inputGroup" />
              <InputGroupAddon addonType="append">
                <Button>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Row>
          <Row>
            <DogDetailTable dogs={this.state.dogs} />
          </Row>
        </Col>
      </Container>
    );
  }
}

export default connect(null, dispatch => ({
  getDogs: () => dispatch(getDogs()),
}))(DogManagementPage);
