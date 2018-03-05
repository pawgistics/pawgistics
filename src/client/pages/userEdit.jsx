import React from 'react';
import CSSModules from 'react-css-modules';
import { Row, Col, Button, Form, Label, FormGroup, ListGroup, Input, FormText, Table } from 'reactstrap';

import styles from '../styles/pages/userEdit.m.scss';
// must fix this later.

const UserEditPage = () => (
  <div>
    <span styleName="my-class">User Edit Page</span>
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
              Upload a picture.
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="4">
          <ListGroup>
            <Label for="exampleName">Name: </Label>
            <Input placeholder="John Doe" />
            <Label for="exampleEmail">Email: </Label>
            <Input placeholder="admin@pawgistics.com" />
            <Label for="examplePhone">Phone #: </Label>
            <Input placeholder="123-456-7890" />
          </ListGroup>
        </Col>
        <Col xs="4">
          <ListGroup>
            <Label for="exampleGender">Gender: </Label>
            <Input type="select">
              <option> Male </option>
              <option> Female </option>
            </Input>
            <Label for="exampleUserType">User Type: </Label>
            <Input placeholder="Admin" />
            <Label for="exampleMember">Member since: </Label>
            <Input placeholder="1890" />
          </ListGroup>
        </Col>
      </Row>
    </Form>
    <br />
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>Training History</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Volunteer, basic</td>
          </tr>
          <tr>
            <td>Agility</td>
          </tr>
        </tbody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button color="secondary" size="lg">Update training history</Button>{' '}
      </div>
    </div>
    <br />
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>Dog Interactive History</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Dog Name</th>
            <th>Dog ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fido</td>
            <td>12345</td>
          </tr>
          <tr>
            <td>Woofer</td>
            <td>54363</td>
          </tr>
        </tbody>
      </Table>
      <br />
    </div>
    <div className="footer">
      <h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button outline="secondary" size="lg">BACK</Button>{' '}
          &nbsp;
          <Button color="secondary" size="lg">SAVE</Button>{' '}
          &nbsp;
          <Button color="primary" size="lg">REMOVE USER</Button>
        </div>
      </h2>
    </div>
  </div>
);

export default CSSModules(UserEditPage, styles);
// export default UserDetailPage;
