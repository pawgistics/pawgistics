// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Container, Label, Form, Row, Col, FormGroup, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getUsers } from '../api/volunteer';
import AdminControl from '../containers/admin-control';
import UserDetailTable from '../containers/user-detail-table';
import Select from '../components/select';

import { ADD_USER_PAGE_ROUTE } from '../routes';

type Props = {
  getUsers: (filters: {}) => Promise,
}

class UsersPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filter: {
        name: '',
        user_type: '',
        include_inactive: false,
      },
    };

    this.updateUsers();

    this.updateUsers = this.updateUsers.bind(this);
    this.updateUsersDebounced = _.debounce(this.updateUsers, 250);
    this.updateNameFilter = this.updateNameFilter.bind(this);
    this.updateUserTypeFilter = this.updateUserTypeFilter.bind(this);
  }

  updateUsers() {
    this.props.getUsers(this.state.filter)
      .then((users) => {
        this.setState({ users });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  updateNameFilter(e) {
    this.setState({
      filter: {
        ...this.state.filter,
        name: e.target.value,
      },
    }, () => {
      this.updateUsersDebounced();
    });
  }

  updateUserTypeFilter(value) {
    this.setState({
      filter: {
        ...this.state.filter,
        user_type: value,
      },
    }, () => {
      this.updateUsers();
    });
  }

  render() {
    return (
      <Container fluid>
        <h1 className="display-4 mb-4">Users</h1>
        <Form>
          <Row className="align-items-center mb-2">
            <Col xs="auto" className="pr-0 text-nowrap">
              <Select
                fixedWidth
                options={[
                  { value: 'instructor', label: 'Instructors' },
                  { value: 'volunteer', label: 'Volunteers' },
                ]}
                value={this.state.filter.user_type}
                onSelectValue={this.updateUserTypeFilter}
                placeholder="Filter by user type"
                isSearchable={false}
              />
            </Col>
            <Col xs="auto" className="pr-0 text-nowrap">
              <FormGroup check inline className="mr-0">
                <Label check>
                  <Input type="checkbox" />Include inactive
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Input type="text" value={this.state.filter.name} onChange={this.updateNameFilter} placeholder="Filter by name" />
            </Col>
          </Row>
        </Form>
        <Row className="mb-3">
          <Col>
            <UserDetailTable users={this.state.users} />
          </Col>
        </Row>
        <AdminControl>
          <Row className="justify-content-center">
            <Col sm="auto">
              <Link to={ADD_USER_PAGE_ROUTE}>
                <Button color="secondary" size="lg">ADD USER</Button>
              </Link>
            </Col>
          </Row>
        </AdminControl>
      </Container>
    );
  }
}

export default connect(null, dispatch => ({
  getUsers: filters => dispatch(getUsers(filters)),
}))(UsersPage);
