import React from 'react';
import CSSModules from 'react-css-modules';
import { Label, Table, Col, InputGroup, InputGroupAddon, Form, FormGroup, Input, Button } from 'reactstrap';
import styles from '../styles/pages/dogManagement.m.scss';
// need to change this later!!

const DogManagementPage = () => (
  <div>
    <span styleName="my-class">Dog Management Page</span>
    {/* <button className="btn btn-primary">Back</button>
    <Button color="primary">Save</Button> */}
    <Form>
      <Col>
        <br />
        <Form inline>
          <Col xs="2">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label check>
                <Input type="checkbox" id="checkbox2" />{' '}
                          Active
              </Label>
            </FormGroup>
          </Col>
          <Col xs="5">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label check>
                <Input type="checkbox" id="checkbox2" />{' '}
                          Available for check out
              </Label>
            </FormGroup>
          </Col>
        </Form>
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
      <Col>
        <br />
        <Table hover>
          <thead>
            <tr>
              <th>Dog Name</th>
              <th>Dog ID</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Fido</th>
              <td>12345</td>
              <td>Training</td>
              <td>
                <Button size="sm"block>View</Button>
              </td>
            </tr>
            <tr>
              <th scope="row">Ruka</th>
              <td>23456</td>
              <td>Checked out</td>
              <td>
                <Button size="sm"block>View</Button>
              </td>
            </tr>
            <tr>
              <th scope="row">Jjo</th>
              <td>34567</td>
              <td>Training</td>
              <td>
                <Button size="sm"block>View</Button>
              </td>
            </tr>
            <tr>
              <th scope="row">Coop</th>
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
  </div>
);

export default CSSModules(DogManagementPage, styles);
// export default DogManagementPage;
