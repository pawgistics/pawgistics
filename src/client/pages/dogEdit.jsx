import React from 'react';
import CSSModules from 'react-css-modules';
import { InputGroupAddon, Label, InputGroup, Row, Col, Button, Form, FormGroup, ListGroup, Input, FormText, Table } from 'reactstrap';

import styles from '../styles/pages/addDog.m.scss';
// must fix this later.

const DogEditPage = () => (
  <div>
    <span styleName="my-class">Dog Edit Page</span>
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
          <ListGroup>
            <Label for="exampleName">Name: </Label>
            <Input placeholder="Fido" />
            <Label for="exampleEmail">ID: </Label>
            <Input placeholder="01234" />
            <Label for="examplePhone">Gender: </Label>
            <Input type="select">
              <option> Male </option>
              <option> Female </option>
            </Input>
          </ListGroup>
        </Col>
        <Col xs="4">
          <ListGroup>
            <Label for="exampleName">DoB: </Label>
            <Input placeholder="07/24/2011" />
            <Label for="exampleEmail">Custody: </Label>
            <Input type="select">
              <option> Canine Assistants </option>
              <option> Volunteer </option>
              <option> Foster </option>
            </Input>
            <Label for="examplePhone">Status: </Label>
            <Input type="select">
              <option> Training </option>
              <option> On Outing </option>
              <option> Housed </option>
            </Input>
          </ListGroup>
        </Col>
      </Row>
    </Form>
    <br />
    <br />
    <InputGroup>
      <Input type="text" className="form-control" placeholder="Search using keywords" id="inputGroup" />
      <InputGroupAddon addonType="append">
        <Button>Search</Button>
      </InputGroupAddon>
    </InputGroup>
    <br />
    <Table hover>
      <thead>
        <tr>
          <th> Dog Interactive History</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name of person</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">10/10/17</th>
          <td>Steve</td>
          <td>Requested to walk Fido</td>
        </tr>
        <tr>
          <th scope="row">10/10/17</th>
          <td>Adam</td>
          <td>Approved Steve to walk Fido</td>
        </tr>
        <tr>
          <th scope="row">10/10/17</th>
          <td>Steve</td>
          <td>Signed Fido back in</td>
        </tr>
        <tr>
          <th scope="row" />
          <td />
          <td />
        </tr>
      </tbody>
    </Table>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button color="secondary" size="lg">Update interactive history</Button>{' '}
    </div>
    <br />
    <br />
    <br />
    <div className="footer">
      <h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button outline="secondary" size="lg">BACK</Button>{' '}
          &nbsp;
          <Button color="secondary" size="lg">SAVE</Button>{' '}
          &nbsp;
          <Button color="primary" size="lg">REMOVE DOG</Button>
        </div>
      </h2>
    </div>
  </div>
);

export default CSSModules(DogEditPage, styles);
// export default DogDetailPage;
