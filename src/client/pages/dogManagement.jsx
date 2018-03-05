// @flow

import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
// import CSSModules from 'react-css-modules';
import { Label, Form, Row, Col, InputGroup, InputGroupAddon, FormGroup, Input, Button } from 'reactstrap';

import { getDogs } from '../api/volunteer';
import DogDetailTable from '../containers/dog-detail-table';
import styles from '../styles/pages/userDetail.m.scss';

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
      <div>
        <span styleName="my-class">Dog Managment Page </span>
        <Form>
          <br />
          <Row className="mb-2">
            <Col xs="4" sm="1">
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" />Active
                </Label>
              </FormGroup>
              &nbsp;
            </Col>
            <Col xs="4">
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" />Available for check out
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Col>
            <InputGroup>
              <Input type="text" className="form-control" placeholder="Search using keywords" id="inputGroup" />
              <InputGroupAddon addonType="append">
                <Button>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <br />
          <Col>
            <DogDetailTable dogs={this.state.dogs} />
          </Col>
        </Form>
        <Row>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Row>
        <div className="footer">
          <h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button color="secondary" size="lg">ADD DOG</Button>{' '}
            </div>
          </h2>
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  getDogs: () => dispatch(getDogs()),
}))(CSSModules(DogManagementPage, styles));
