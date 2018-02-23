// @flow

import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Row, Col, Button, Form, ListGroup, ListGroupItem, Table } from 'reactstrap';

import { getUser } from '../api/volunteer';
import styles from '../styles/pages/userDetail.m.scss';
// must fix this later.

type Props = {
  match: Object,
  getUser(id): Promise,
}

class UserDetailPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { user: {} };
    this.props.getUser(props.match.params.id)
      .then((response) => {
        if (response.success) {
          this.setState({ user: response.response });
        } else {
          // eslint-disable-next-line no-console
          console.log(response.message);
        }
      }).catch(() => {
        // eslint-disable-next-line no-console
        console.log('Failed to get a resopnse from the server.');
      });
  }

  render() {
    return (
      <div>
        <span styleName="my-class">User Detail Page</span>
        {/* <button className="btn btn-primary">Back</button>
        <Button color="primary">Save</Button> */}
        <Form>
          <br />
          <Row>
            <Col xs="3">
              <dt>Profile picture</dt>
              <img src={this.state.user.uri} alt={this.state.user.fname} className="border rounded" />
            </Col>
            <Col xs="4">
              <ListGroup>
                <ListGroupItem className="justify-content-between">Name: {this.state.user.fname} {this.state.user.lname}</ListGroupItem>
                <ListGroupItem className="justify-content-between">Email: {this.state.user.email} </ListGroupItem>
                <ListGroupItem className="justify-content-between">Phone #: {this.state.user.phone} </ListGroupItem>
                <ListGroupItem className="justify-content-between">Member since: 2015 </ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs="4">
              <ListGroup>
                <ListGroupItem className="justify-content-between">User Type: Volunteer </ListGroupItem>
                {/* <ListGroupItem className="justify-content-between">Address:
                  {this.state.user.address.line1}
                  {this.state.user.address.line2}, {this.state.user.address.city},
                  {this.state.user.address.state} {this.state.user.address.zip} </ListGroupItem> */}
              </ListGroup>
            </Col>
          </Row>
        </Form>
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
          <br />
        </div>
        <div className="footer">
          <h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button color="secondary" size="lg">BACK</Button>{' '}
              <Button color="danger" size="lg">EDIT DETAILS</Button>
            </div>
          </h2>
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  getUser: id => dispatch(getUser(id)),
}))(CSSModules(UserDetailPage, styles));
