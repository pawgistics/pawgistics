// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroupItem, Button, Input } from 'reactstrap';

import ResponsiveListGroup from '../components/responsive-list-group';
import RequestsDetailTable from '../containers/requests-detail-table';
import AdminControl from '../containers/admin-control';

import { getUser } from '../api/volunteer';
import { getUserOutings } from '../api/admin';

import { editUserPageRoute } from '../routes';

type Props = {
  match: Object,
  history: Object,
  isAdmin: boolean,
  getUser: (id) => Promise,
  getUserOutings: (id, filter) => Promise,
}

class UserDetailPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      dogName: '',
      outings: [],
      loading: true,
    };

    this.updateOutings = this.updateOutings.bind(this);
    this.loadMoreOutings = this.loadMoreOutings.bind(this);
    this.updateOutingsDebounced = _.debounce(this.updateOutings, 250);

    if (props.isAdmin) {
      this.updateOutings();
    }

    this.updateNameFilter = this.updateNameFilter.bind(this);

    this.props.getUser(props.match.params.id)
      .then((user) => {
        this.setState({ user });
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  updateOutings() {
    this.setState({ loading: true });
    this.props.getUserOutings(this.props.match.params.id, {
      dog_name: this.state.dogName,
    })
      .then((outings) => {
        this.setState({ outings, loading: false });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  loadMoreOutings() {
    this.setState({ loading: true });
    this.props.getUserOutings(this.props.match.params.id, {
      dog_name: this.state.dogName,
      before: this.state.outings[this.state.outings.length - 1].updated_at,
    })
      .then((outings) => {
        this.setState({ outings: _.concat(this.state.outings, outings), loading: false });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  updateNameFilter(e) {
    this.setState({
      dogName: e.target.value,
    }, () => {
      this.updateOutingsDebounced();
    });
  }

  render() {
    return (
      <>
        <span className="title-text">User Details</span>
        <Row noGutters>
          <Col className="d-flex mb-3 mr-3" xs="12" sm="auto">
            <img src={this.state.user.uri} alt={this.state.user.first_name} className="profile-img border rounded mx-auto" />
          </Col>
          <Col className="mb-3" xs="12" sm="" xl="8">
            <ResponsiveListGroup>
              <ListGroupItem>First Name: {this.state.user.first_name}</ListGroupItem>
              <ListGroupItem>Last Name: {this.state.user.last_name}</ListGroupItem>
              <ListGroupItem>Email: {this.state.user.email}</ListGroupItem>
              <ListGroupItem>Phone #: {this.state.user.phone_number}</ListGroupItem>
              <ListGroupItem>User Type: {this.state.user.admin ? 'Instructor' : 'Volunteer'}</ListGroupItem>
              <ListGroupItem>Status: {this.state.user.active ? 'Active' : 'Inactive'}</ListGroupItem>
            </ResponsiveListGroup>
          </Col>
        </Row>
        <AdminControl>
          <Row className="mb-2">
            <Col>
              <h1 className="mb-0">Outings</h1>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Input type="text" value={this.state.dogName} onChange={this.updateNameFilter} placeholder="Filter by dog name" />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <RequestsDetailTable
                view="user"
                requests={this.state.outings}
                loading={this.state.loading}
                onReload={this.updateOutings}
              />
            </Col>
          </Row>
        </AdminControl>
        <Row noGutters className="justify-content-center">
          <Col xs="" sm="auto" className="mr-2 mx-sm-2">
            <Button block outline size="lg" onClick={this.props.history.goBack}>Back</Button>
          </Col>
          <AdminControl>
            <Col xs="" sm="auto" className="ml-2 mx-sm-2">
              <Link className="btn btn-secondary btn-lg btn-block" to={editUserPageRoute(this.state.user.id)}>Edit</Link>
            </Col>
          </AdminControl>
        </Row>
      </>
    );
  }
}

export default connect(
  state => ({
    isAdmin: state.auth.isAdmin,
  }),
  dispatch => ({
    getUser: id => dispatch(getUser(id)),
    getUserOutings: (id, filter) => dispatch(getUserOutings(id, filter)),
  }),
)(UserDetailPage);
