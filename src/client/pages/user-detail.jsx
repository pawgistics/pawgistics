// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Input } from 'reactstrap';
import ResponsiveListGroup from '../containers/responsive-list-group';
import DetailTable from '../components/detail-table';
import OutingDetailTable from '../containers/outing-detail-table';
import AdminControl from '../containers/admin-control';
import { getUser } from '../api/volunteer';
import '../styles/pages/detail-page.m.scss';

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
        <span className="title-text">User Details</span>
        <Row noGutters>
          <Col className="d-flex mb-3 mr-3" xs="12" sm="auto">
            <img src={this.state.user.uri} alt={this.state.user.first_name} styleName="profile-img" className="border rounded mx-auto" />
          </Col>
          <Col className="mb-3" xs="12" sm="">
            <ResponsiveListGroup items={[
              `First Name: ${this.state.user.first_name}`,
              `Last Name: ${this.state.user.last_name}`,
              `Email: ${this.state.user.email}`,
              `Phone #: ${this.state.user.phone || ''}`,
              `User Type: ${this.state.user.admin ? 'Instructor' : 'Volunteer'}`,
            ]}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <h1 className="mb-0">Training</h1>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <DetailTable
              headings={['Name', 'Date']}
              keys={['name', 'date']}
              items={[
                { name: 'Volunteer, basic', date: '10/10/17' },
                { name: 'Agility', date: '10/10/17' },
              ]}
            />
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
            <Link to={USERS_PAGE_ROUTE}>
              <Button color="secondary" size="lg">BACK</Button>
            </Link>
          </Col>
          <AdminControl>
            <Col xs="auto" className="mx-2">
              <Link to={editUserPageRoute(this.state.user.id)}>
                <Button color="primary" size="lg">EDIT</Button>
              </Link>
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
