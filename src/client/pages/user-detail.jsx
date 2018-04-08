// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroupItem, Button, Input } from 'reactstrap';

import ResponsiveListGroup from '../containers/responsive-list-group';
import OutingDetailTable from '../containers/outing-detail-table';
import AdminControl from '../containers/admin-control';

import { getUser } from '../api/volunteer';
import '../styles/pages/detail-page.m.scss';

import { editUserPageRoute } from '../routes';

type Props = {
  match: Object,
  history: Object,
  getUser(id): Promise,
}

class UserDetailPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { user: {} };
    this.props.getUser(props.match.params.id)
      .then((user) => {
        this.setState({ user });
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  render() {
    return (
      <>
        <span className="title-text">User Details</span>
        <Row noGutters>
          <Col className="d-flex mb-3 mr-3" xs="12" sm="auto">
            <img src={this.state.user.uri} alt={this.state.user.first_name} styleName="profile-img" className="border rounded mx-auto" />
          </Col>
          <Col className="mb-3" xs="12" sm="">
            <ResponsiveListGroup>
              <ListGroupItem>First Name: {this.state.user.first_name}</ListGroupItem>
              <ListGroupItem>Last Name: {this.state.user.last_name}</ListGroupItem>
              <ListGroupItem>Email: {this.state.user.email}</ListGroupItem>
              <ListGroupItem>Phone #: {this.state.user.phone || ''}</ListGroupItem>
              <ListGroupItem>User Type: {this.state.user.admin ? 'Instructor' : 'Volunteer'}</ListGroupItem>
            </ResponsiveListGroup>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <h1 className="mb-0">Outings</h1>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Input type="text" placeholder="Filter by dog name" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <OutingDetailTable
              subjectName="Dog"
              outings={[
              { name: 'Goku', date: '10/10/17', action: 'Took on a walk' },
              { name: 'Goku', date: '10/10/17', action: 'Requested an outing' },
              { name: 'Bulma', date: '10/10/17', action: 'Signed back in' }]}
            />
          </Col>
        </Row>
        <Row noGutters className="justify-content-center">
          <Col xs="auto" className="mx-2">
            <Button color="secondary" size="lg" onClick={this.props.history.goBack}>BACK</Button>
          </Col>
          <AdminControl>
            <Col xs="auto" className="mx-2">
              <Link className="btn btn-primary btn-lg" to={editUserPageRoute(this.state.user.id)}>EDIT</Link>
            </Col>
          </AdminControl>
        </Row>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getUser: id => dispatch(getUser(id)),
}))(UserDetailPage);
