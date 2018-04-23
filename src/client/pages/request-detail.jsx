// @flow

import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { FormGroup, Row, Col, ListGroupItem, Button, Label, Input } from 'reactstrap';

import ListGroupItemLink from '../components/list-group-item-link';
import ResponsiveListGroup from '../components/responsive-list-group';

import AdminControl from '../containers/admin-control';
import VolunteerControl from '../containers/volunteer-control';

import { getRequest, updateRequestStatus } from '../api/admin';

import { userDetailPageRoute, dogDetailPageRoute } from '../routes';

type Props = {
  match: Object,
  history: Object,
  getRequest(id): Promise,
  updateRequestStatus(id, update): Promise,
}

class RequestDetailPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      request: {
        id: '',
        description: '',
        decision_status: 'Pending',
        decision_reason: '',
        pickup_date: '',
        return_date: '',
        dog: {
          id: '',
          name: '',
        },
        user: {
          id: '',
          name: '',
        },
      },
    };

    this.updateReason = this.updateReason.bind(this);
    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);
    this.saveRequest = this.saveRequest.bind(this);

    this.props.getRequest(props.match.params.id)
      .then((request) => {
        this.setState({ request });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  updateReason(e) {
    this.setState({
      request: {
        ...this.state.request,
        decision_reason: e.target.value,
      },
    });
  }

  approve() {
    this.setState({
      request: {
        ...this.state.request,
        decision_status: 'Approved',
      },
    }, this.saveRequest);
  }

  reject() {
    this.setState({
      request: {
        ...this.state.request,
        decision_status: 'Rejected',
      },
    }, this.saveRequest);
  }

  saveRequest() {
    this.props.updateRequestStatus(this.state.request.id, {
      status: this.state.request.decision_status,
      reason: this.state.request.decision_reason,
    });
  }

  render() {
    return (
      <>
        <span className="title-text">Request</span>
        <Row noGutters>
          <Col className="mb-4" xs="12">
            <ResponsiveListGroup>
              <AdminControl>
                <ListGroupItemLink to={userDetailPageRoute(this.state.request.user.id)}>
                  Volunteer: {this.state.request.user.name}
                </ListGroupItemLink>
              </AdminControl>
              <ListGroupItemLink to={dogDetailPageRoute(this.state.request.dog.id)}>
                Dog: {this.state.request.dog.name}
              </ListGroupItemLink>
              <VolunteerControl>
                <ListGroupItem>Status: {this.state.request.decision_status}</ListGroupItem>
              </VolunteerControl>
              <ListGroupItem>Pickup Date: {this.state.request.pickup_date}</ListGroupItem>
              <ListGroupItem>Return Date: {this.state.request.return_date}</ListGroupItem>
            </ResponsiveListGroup>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs="12">
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="text"
                id="description"
                value={this.state.request.description}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <AdminControl>
          <Row className="mb-2">
            <Col xs="12">
              <FormGroup>
                <Label for="reason">Reason for rejection</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="reason"
                  onChange={this.updateReason}
                  value={this.state.request.decision_reason}
                />
              </FormGroup>
            </Col>
          </Row>
        </AdminControl>
        <VolunteerControl>
          {this.state.request.decision_status === 'Rejected' ? (
            <Row className="mb-2">
              <Col xs="12">
                <FormGroup>
                  <Label for="reason">Reason for rejection</Label>
                  <Input
                    type="textarea"
                    name="text"
                    id="reason"
                    onChange={this.updateReason}
                    value={this.state.request.decision_reason}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
          ) : null}
        </VolunteerControl>
        <Row noGutters className="justify-content-center">
          <Col xs="" sm="auto" className="mr-2 mx-sm-2 mb-3 mb-sm-0">
            <Button block outline size="lg" onClick={this.props.history.goBack}>Back</Button>
          </Col>
          <AdminControl>
            <Col xs="" sm="auto" className="ml-2 mx-sm-2 mb-3 mb-sm-0">
              <Button block size="lg" onClick={this.approve}>Approve Request</Button>
            </Col>
            <Col xs="12" sm="auto" className="mx-2">
              <Button block color="primary" size="lg" onClick={this.reject}>Reject Request</Button>
            </Col>
          </AdminControl>
        </Row>
      </>
    );
  }
}

// export default RequestDetailPage;
export default connect(null, dispatch => ({
  getRequest: id => dispatch(getRequest(id)),
  updateRequestStatus: (id, update) => dispatch(updateRequestStatus(id, update)),
}))(RequestDetailPage);
