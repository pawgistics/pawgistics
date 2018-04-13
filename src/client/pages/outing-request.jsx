// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Label, Form, Row, Col, FormGroup, Input, Button } from 'reactstrap';

import { getDogs } from '../api/volunteer';

class OutingRequestPage extends React.Component<Props> {
  // eslint-disable-next-line no-useless-constructor
  render() {
    return (
      <>
        <span className="title-text">Outing Request</span>
        {/* <button className="btn btn-primary">Back</button>
        <Button color="primary">Save</Button> */}
        <Form>
          <br />
          <Row>
            <Col sm={8}>
              <Label for="Date">Outing Date</Label>
              <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={8}>
              <Label for="Time">Outing Time</Label>
              <Input type="time" name="time" id="exampleTime" placeholder="time placeholder" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={8}>
              <Label for="Date">Expected Return Date</Label>
              <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={8}>
              <Label for="Time">Expected Return Time</Label>
              <Input type="time" name="time" id="exampleTime" placeholder="time placeholder" />
            </Col>
          </Row>
          <br />
          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>Outing Description</h5>
            </legend>
            <Col sm={10}>
              <Input type="textarea" name="text" id="exampleText" placeholder="Please provide description of what you expect to do on the outing." />
            </Col>
          </FormGroup>
          <br />
          <br />
          <Row noGutters className="justify-content-center">
            <Col xs="4" sm="auto" className="mr-2 mx-sm-2">
              <Button block size="lg">Back</Button>
            </Col>
            <Col xs="4" sm="auto" className="mr-2 mx-sm-2">
              <Button block size="lg">Request Dog</Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getDogs: () => dispatch(getDogs()),
}))(OutingRequestPage);
