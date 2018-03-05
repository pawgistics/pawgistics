// @flow

import React from 'react';
import CSSModules from 'react-css-modules';
import { Button, InputGroup, InputGroupAddon, Row, Form, Col, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { getUsers } from '../api/volunteer';
import UserDetailTable from '../containers/user-detail-table';
import styles from '../styles/pages/userManagement.m.scss';
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
          <br />
          <Row className="mb-2">
            <Col xs="7" sm="3">
              <FormGroup check inline>
                <Label>User Type: </Label>
                <Input type="select">
                  <option> Canine Assistants </option>
                  <option> Volunteer </option>
                  <option> Foster </option>
                </Input>
              </FormGroup>
            </Col>
            &nbsp;
            <Col xs="4">
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" id="checkbox2" />{' '}
                            Has dog
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Col>
            <InputGroup>
              <Input type="text" className="form-control" placeholder="Search for names" id="inputGroup" />
              <InputGroupAddon addonType="append">
                <Button>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <br />
          <Col>
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
        </Row>
        <div className="footer">
          <h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button color="secondary" size="lg">ADD USER</Button>{' '}
            </div>
          </h2>
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  getUsers: () => dispatch(getUsers()),
}))(CSSModules(UserManagementPage, styles));
// export default UserManagementPage;
