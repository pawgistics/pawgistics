// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Label, Form, Row, Col, InputGroup, InputGroupAddon, FormGroup, Input, Button } from 'reactstrap';

import { getDogs } from '../api/volunteer';
import DogDetailTable from '../containers/dog-detail-table';
import '../styles/pages/userDetail.m.scss';

type Props = {
  getDogs: () => Promise,
}

class DogManagementPage extends React.Component<Props> {
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
      <div>
        <span styleName="my-class">Dog Managment Page </span>
        <Form>
          <br />
          <Col>
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
          </Col>
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
}))(DogManagementPage);
