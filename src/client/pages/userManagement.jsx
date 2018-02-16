import React from 'react';
import CSSModules from 'react-css-modules';
import { Button, Table, InputGroup, InputGroupAddon, Row, Form, Col, FormGroup, Label, Input } from 'reactstrap';

import styles from '../styles/pages/userManagement.m.scss';
// must change this later!

const UserManagementPage = () => (
  <div>
    <span styleName="my-class">User Management Page</span>
    {/* <button className="btn btn-primary">Back</button>
    <Button color="primary">Save</Button> */}
    <Form>
      <Col>
        <br />
        <Form inline>
          <Col xs="4">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              {/* <Label for="exampleGender">Gender</Label> */}
              <dt>User Type</dt>
              <Input type="select" name="gender" id="examplegender">
                <option>Volunteer</option>
                <option>Instructor</option>
              </Input>
            </FormGroup>
          </Col>
          <Col xs="5">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label check>
                <Input type="checkbox" id="checkbox2" />{' '}
                          Has dog
              </Label>
            </FormGroup>
          </Col>
        </Form>
      </Col>
      <br />
      <Col>
        <InputGroup>
          <Input type="text" className="form-control" placeholder="Search for names" id="inputGroup" />
          <InputGroupAddon addonType="append">
            <Button>Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
      <Col>
        <br />
        <Table hover>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>User Type</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" />
              <td>Jessica Acissaej</td>
              <td>Volunteer</td>
              <td>
                <Button size="sm"block>View</Button>
              </td>
            </tr>
            <tr>
              <th scope="row" />
              <td>Robin Smith</td>
              <td>Instructor</td>
              <td>
                <Button size="sm"block>View</Button>
              </td>
            </tr>
            <tr>
              <th scope="row" />
              <td>Isaiah Heart</td>
              <td>Volunteer</td>
              <td>
                <Button size="sm"block>View</Button>
              </td>
            </tr>
            <tr>
              <th scope="row" />
              <td />
              <td />
              <td>
                <Button size="sm"block>View</Button>
              </td>
            </tr>
            <tr>
              <th scope="row" />
              <td />
              <td />
              <td>
                <Button size="sm"block>View</Button>
              </td>
            </tr>
            <tr>
              <th scope="row" />
              <td />
              <td />
            </tr>
          </tbody>
        </Table>
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
      <br />
      <br />
    </Row>
    <div className="footer">
      <h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="secondary" size="lg">Add User</Button>{' '}
        </div>
      </h2>
    </div>
  </div>
);

export default CSSModules(UserManagementPage, styles);
// export default UserManagementPage;
