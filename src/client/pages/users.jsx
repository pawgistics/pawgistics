// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Label, Form, Row, Col, Button, FormGroup, Input } from 'reactstrap';
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
        inactive: false,
      },
      loading: true,
    };

    this.updateUsers = this.updateUsers.bind(this);
    this.loadMoreUsers = this.loadMoreUsers.bind(this);
    this.updateUsersDebounced = _.debounce(this.updateUsers, 250);

    this.updateUsers();

    this.updateFilterState = this.updateFilterState.bind(this);
    this.updateNameFilter = this.updateNameFilter.bind(this);
    this.updateUserTypeFilter = this.updateUserTypeFilter.bind(this);
    this.updateInactiveFilter = this.updateInactiveFilter.bind(this);
  }

  updateUsers() {
    this.setState({ loading: true });
    this.props.getUsers(this.state.filter)
      .then((users) => {
        this.setState({ users, loading: false });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  loadMoreUsers() {
    this.setState({ loading: true });
    this.props.getUsers({
      ...this.state.filter,
      before: this.state.users[this.state.users.length - 1].updated_at,
    })
      .then((users) => {
        this.setState({ users: _.concat(this.state.users, users), loading: false });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  updateFilterState(update, cb) {
    this.setState({ filter: { ...this.state.filter, ...update } }, cb);
  }

  updateNameFilter(e) {
    this.updateFilterState({
      name: e.target.value,
    }, () => {
      this.updateUsersDebounced();
    });
  }

  updateUserTypeFilter(value) {
    this.updateFilterState({
      user_type: value,
    }, () => {
      this.updateUsers();
    });
  }

  updateInactiveFilter(e) {
    this.updateFilterState({
      inactive: e.target.checked,
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
                  <Input type="checkbox" checked={this.state.filter.inactive} onChange={this.updateInactiveFilter} />Include inactive
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
            <UserDetailTable
              users={this.state.users}
              loading={this.state.loading}
              onReload={this.updateUsers}
            />
          </Col>
        </Row>
        <Row noGutters className="justify-content-center">
          <Col xs="" sm="auto" className="mr-2 mx-sm-2">
            <Button block outline size="lg" onClick={this.loadMoreUsers}>Load More</Button>
          </Col>
          <AdminControl>
            <Col xs="" sm="auto" className="ml-2 mx-sm-2">
              <Link className="btn btn-secondary btn-lg btn-block" to={ADD_USER_PAGE_ROUTE}>Add User</Link>
            </Col>
          </AdminControl>
        </Row>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getUsers: filters => dispatch(getUsers(filters)),
}))(UsersPage);
