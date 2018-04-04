// @flow

import React from 'react';
import { Button, InputGroup, InputGroupAddon, Row, Form, Col, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminControl from '../containers/admin-control';
// import Select from '../components/select';
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
      .then((users) => {
        this.setState({ users });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  render() {
    return (
      <div>
        <span styleName="my-class">Users</span>
        {/* <button className="btn btn-primary">Back</button>
        <Button color="primary">Save</Button> */}
        <Form>
          <br />
          <Col>
            <Row className="mb-2">
              <Col xs="7" sm="3">
                <FormGroup check inline>
                  <Label>User Type: </Label>
                  <Input type="select">
                    <option> Canine Assistants </option>
                    <option> Volunteer </option>
                    <option> Foster </option>
                  </Input>
                  {/* <Select
                    options={[
                      { value: 'all', label: 'All' },
                      { value: 'instructor', label: 'Instructors' },
                      { value: 'volunteer', label: 'Volunteers' },
                    ]}
                    value="all"
                    isSearchable={false}
                  /> */}
                </FormGroup>
              </Col>
              &nbsp;
              <Col xs="4">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" id="checkbox2" />
                              Has dog
                  </Label>
                </FormGroup>
              </Col>
            </Row>
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
        </Row>
        <div className="footer">
          <h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AdminControl>
                <Link to="/addUser">
                  <Button color="secondary" size="lg">ADD USER</Button>
                </Link>
              </AdminControl>
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
