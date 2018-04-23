// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { getRequests } from '../api/volunteer';
import RequestsDetailTable from '../containers/requests-detail-table';
import VolunteerControl from '../containers/volunteer-control';

type Props = {
  isAdmin: boolean,
  getRequests: () => Promise,
}

class RequestsPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      loading: true,
    };

    this.updateRequests = this.updateRequests.bind(this);
    this.loadMoreRequests = this.loadMoreRequests.bind(this);

    this.updateRequests();
  }

  updateRequests() {
    this.setState({ loading: true });
    this.props.getRequests()
      .then((requests) => {
        this.setState({ requests, loading: false });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  loadMoreRequests() {
    this.setState({ loading: true });
    this.props.getRequests(this.state.requests[this.state.requests.length - 1].updated_at)
      .then((requests) => {
        this.setState({ requests: _.concat(this.state.requests, requests), loading: false });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  render() {
    return (
      <>
        <span className="title-text">Requests</span>
        <Row className="mb-3">
          <Col>
            <RequestsDetailTable
              view={this.props.isAdmin ? 'instructor' : 'volunteer'}
              requests={this.state.requests}
              loading={this.state.loading}
              onReload={this.updateRequests}
            />
          </Col>
        </Row>
        <VolunteerControl>
          <Row noGutters className="justify-content-center">
            <Col xs="" sm="auto" className="mr-2 mx-sm-2">
              <Button block outline size="lg" onClick={this.loadMoreRequests}>Load More</Button>
            </Col>
          </Row>
        </VolunteerControl>
      </>
    );
  }
}

export default connect(
  state => ({
    isAdmin: state.auth.isAdmin,
  }),
  dispatch => ({
    getRequests: before => dispatch(getRequests(before)),
  }),
)(RequestsPage);
