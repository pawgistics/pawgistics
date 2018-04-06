// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Form, ListGroup, ListGroupItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AdminControl from '../containers/admin-control';
import { getUser } from '../api/volunteer';
import '../styles/pages/user-detail.m.scss';

import { USERS_PAGE_ROUTE, editUserPageRoute } from '../routes';

type Props = {
  match: Object,
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
        <h1 className="display-4">User Details</h1>
        {/* <button className="btn btn-primary">Back</button>
        <Button color="primary">Save</Button> */}
        <Form>
          <br />
          <Row>
            <Col xs="3">
              <img src={this.state.user.uri} alt={this.state.user.first_name} className="border rounded" />
            </Col>
            <Col xs="4">
              <ListGroup>
                <ListGroupItem className="justify-content-between">Name: {this.state.user.first_name} {this.state.user.last_name}</ListGroupItem>
                <ListGroupItem className="justify-content-between">Email: {this.state.user.email} </ListGroupItem>
                <ListGroupItem className="justify-content-between">Phone #: {this.state.user.phone} </ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs="4">
              <ListGroup>
                <ListGroupItem className="justify-content-between">Gender: Male </ListGroupItem>
                <ListGroupItem className="justify-content-between">User Type: Admin </ListGroupItem>
                <ListGroupItem className="justify-content-between">Member since: 1890 </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Form>
        <br />
        <br />
        <br />
        <br />
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>Training History</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Volunteer, basic</td>
              </tr>
              <tr>
                <td>Agility</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <br />
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>Dog Interactive History</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Dog Name</th>
                <th>Dog ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fido</td>
                <td>12345</td>
              </tr>
              <tr>
                <td>Woofer</td>
                <td>54363</td>
              </tr>
            </tbody>
          </Table>
          <br />
        </div>
        <div className="footer">
          <h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={USERS_PAGE_ROUTE}>
                <Button color="secondary" size="lg">BACK</Button>
              </Link>
              &nbsp;
              <AdminControl>
                <Link to={editUserPageRoute(this.state.user.id)}>
                  <Button color="primary" size="lg">EDIT</Button>
                </Link>
              </AdminControl>
            </div>
          </h2>
        </div>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getUser: id => dispatch(getUser(id)),
}))(UserDetailPage);
