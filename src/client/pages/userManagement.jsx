// @flow

import React from 'react';
import { Button, InputGroup, InputGroupAddon, Row, Form, Col, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { getUsers } from '../api/volunteer';
import UserDetailTable from '../containers/user-detail-table';
import '../styles/pages/userManagement.m.scss';
// must change this later!

type Props = {
  getUsers: () => Promise,
}

class UserManagementPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.props.getUsers()
      .then((response) => {
        if (response.success) {
          this.setState({ users: response.response });
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
            <UserDetailTable users={this.state.users} />
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
  }
}

export default connect(null, dispatch => ({
  getUsers: () => dispatch(getUsers()),
}))(UserManagementPage);
// export default UserManagementPage;
