// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroupItem } from 'reactstrap';

import ResponsiveListGroup from '../components/responsive-list-group';
import { getUser } from '../api/volunteer';
import { editUserPageRoute } from '../routes';

type Props = {
  me: String,
  getUser(id): Promise,
}

const mapStateToProps = state => ({
  me: state.auth.id,
});

class UserDetailPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    console.log(this.state);
    this.state = { user: {} };
    this.props.getUser(this.props.me)
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
        <Row>
          <Col xs="" sm="auto" className="ml-2 mx-sm-2">
            <Link className="btn btn-secondary btn-lg btn-block" to={editUserPageRoute(this.props.me)}>Edit</Link>
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(mapStateToProps, dispatch => ({
  getUser: id => dispatch(getUser(id)),
}))(UserDetailPage);
