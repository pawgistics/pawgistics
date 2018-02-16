import React from 'react';
import CSSModules from 'react-css-modules';
import { Row, Col, Button, Form, FormGroup, ListGroup, ListGroupItem, Badge, Input, FormText, Table } from 'reactstrap';

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
              Upload the picture of the dog.
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="4">
          <ListGroup>
            <ListGroupItem className="justify-content-between">Name: <Badge pill> Jessica Acissej </Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">Email: <Badge pill size="lg"> JAcissej@gmail.com </Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">Phone #: <Badge pill> 404-000-0000 </Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">Gender: <Badge pill> Female </Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">Member since: <Badge pill> 1890 </Badge></ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs="4">
          <ListGroup>
            <ListGroupItem className="justify-content-between">DoB<Badge pill>02/14/1860</Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">User Type: <Badge pill> Volunteer </Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">Years of experience: <Badge pill> 4 </Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">Address: <Badge pill> 1212 Dolvin Drive, Johns Creek, GA </Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">Emergency Contact<Badge pill> 404-111-1111 </Badge></ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Form>
    <br />
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
      <div>
        <h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button outline="secondary" size="lg">Add new training history</Button>{' '}
          </div>
        </h2>
      </div>
    </div>
    <br />
    <br />
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
      <br />
    </div>
    <div className="footer">
      <h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button outline="secondary" size="lg">Cancel</Button>{' '}
          <Button outline="primary" size="lg">Save</Button>{' '}
          <Button color="danger" size="lg">REMOVE USER</Button>
        </div>
      </h2>
    </div>
  </div>
);

export default CSSModules(UserEditPage, styles);
// export default UserDetailPage;
