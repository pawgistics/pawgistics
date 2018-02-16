import React from 'react';
import CSSModules from 'react-css-modules';
import { InputGroupAddon, InputGroup, Row, Col, Button, Form, FormGroup, ListGroup, ListGroupItem, Badge, Input, FormText, Table } from 'reactstrap';

import styles from '../styles/pages/dogDetail.m.scss';
// must fix this later.

const DogDetailPage = () => (
  <div>
    <span styleName="my-class">Dog Detail Page</span>
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
            <ListGroupItem className="justify-content-between">Name: <Badge pill> Fido </Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">ID: <Badge pill> 01234 </Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">Gender: <Badge pill> Male </Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between">DoB: <Badge pill> 07/24/2011 </Badge></ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs="4">
          <FormGroup>
            <ListGroup>
              <ListGroupItem className="justify-content-between">Custody: <Badge pill> C.Aa </Badge></ListGroupItem>
              <Form inline>
                <div className="form-group">
                  <ListGroupItem className="justify-content-between">Status: <Badge pill> Training </Badge></ListGroupItem>
                  <Button>Edit</Button>
                </div>
              </Form>
            </ListGroup>
          </FormGroup>
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
        <tr>
          <th scope="row" />
          <td />
          <td />
        </tr>
        <tr>
          <th scope="row" />
          <td />
          <td />
        </tr>
      </tbody>
    </Table>
    <br />
    <br />
    <br />
    <div className="footer">
      <h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="secondary" size="lg">BACK</Button>{' '}
          <Button color="danger" size="lg">EDIT DETAILS</Button>
        </div>
      </h2>
    </div>
  </div>
);

export default CSSModules(DogDetailPage, styles);
// export default DogDetailPage;
