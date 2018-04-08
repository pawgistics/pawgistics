// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Label, Form, Row, Col, FormGroup, Input } from 'reactstrap';
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
      <>
        <span className="title-text">Users</span>
        <Form>
          <Row noGutters className="align-items-center mb-2">
            <Col xs="12" sm="6" lg="4" xl="3" className="pr-sm-2 mb-2 text-nowrap">
              <Select
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
            <Col xs="auto" className="pl-sm-2 pr-3 mb-2 text-nowrap">
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
            <Col xs="auto">
              <Link className="btn btn-secondary btn-lg" to={ADD_USER_PAGE_ROUTE}>ADD USER</Link>
            </Col>
          </Row>
        </AdminControl>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getUsers: filters => dispatch(getUsers(filters)),
}))(UsersPage);
