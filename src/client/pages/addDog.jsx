import React from 'react';
import CSSModules from 'react-css-modules';
import { Row, Col, Button, Form, FormGroup, Input, FormText } from 'reactstrap';

import styles from '../styles/pages/addDog.m.scss';

const AddDogPage = () => (
  <div>
    <span styleName="my-class">Add Dog Page</span>
    {/* <button className="btn btn-primary">Back</button>
    <Button color="primary">Save</Button> */}
    <Form>
      <br />
      <Row>
        <Col xs="3">
          <FormGroup>
            {/* <Label for="examplePicFile">Profile picture</Label> */}
            <dt>Profile picture</dt>
            <Input type="file" name="picfile" id="examplePicFile" />
            <FormText color="muted">
              Upload the picture of the dog.
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="4">
          <FormGroup>
            {/* <Label for="exampleName">Name</Label> */}
            <dt>Name</dt>
            <Input type="text" name="name" id="exampleName" placeholder="Insert dog name here" />
          </FormGroup>
          <FormGroup>
            {/* <Label for="exampleDogID">Dog ID</Label> */}
            <dt>Dog ID</dt>
            <Input type="number" name="id" id="exampledogID" placeholder="Insert dog ID here" />
          </FormGroup>
          <FormGroup>
            {/* <Label for="exampleGender">Gender</Label> */}
            <dt>Gender</dt>
            <Input type="select" name="gender" id="examplegender">
              <option>Male</option>
              <option>Female</option>
            </Input>
          </FormGroup>
          <FormGroup>
            {/* <Label for="exampleDoB">DOB</Label> */}
            <dt>DoB</dt>
            <Input type="date" name="dateofbirth" id="exampleDateofBirth" placeholder="Select date" />
          </FormGroup>
        </Col>
        <Col xs="4">
          <FormGroup>
            <dt>Custody</dt>
            <Input type="select" name="custody" id="examplecustody">
              <option>C.A.</option>
              <option>Other</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <dt>Status</dt>
            <Input type="select" name="status" id="examplestatus">
              <option>Training</option>
              <option>Other</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
    </Form>
    <br />
    <br />
    <br />
    <div className="footer">
      <h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="secondary" size="lg">BACK</Button>{' '}
          <Button color="danger" size="lg">SAVE</Button>
        </div>
      </h2>
    </div>
  </div>
);

export default CSSModules(AddDogPage, styles);
// export default AddDogPage;
