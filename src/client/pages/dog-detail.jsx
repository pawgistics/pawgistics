// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroupItem, Button, Input } from 'reactstrap';

import ListGroupItemLink from '../components/list-group-item-link';
import ResponsiveListGroup from '../components/responsive-list-group';
import RequestsDetailTable from '../containers/requests-detail-table';
import AdminControl from '../containers/admin-control';

import { getDog } from '../api/volunteer';
import { getDogOutings } from '../api/admin';

import { userDetailPageRoute, editDogPageRoute, requestDogPageRoute } from '../routes';

type Props = {
  match: Object,
  history: Object,
  isAdmin: boolean,
  getDog: (id) => Promise,
  getDogOutings: (id, filter) => Promise,
}

class DogDetailPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dog: {
        instructor: {
          id: '',
          first_name: '',
          last_name: '',
        },
        litter: {
          id: '',
          name: '',
        },
      },
      userName: '',
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

    this.props.getDog(props.match.params.id)
      .then((dog) => {
        this.setState({ dog });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  updateOutings() {
    this.setState({ loading: true });
    this.props.getDogOutings(this.props.match.params.id, {
      user_name: this.state.userName,
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
    this.props.getDogOutings(this.props.match.params.id, {
      user_name: this.state.userName,
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
      userName: e.target.value,
    }, () => {
      this.updateOutingsDebounced();
    });
  }

  render() {
    return (
      <>
        <span className="title-text">Dog Details</span>
        <Row noGutters>
          <Col className="d-flex mb-3 mr-3" xs="12" sm="auto">
            <img src={this.state.dog.uri} alt={this.state.dog.name} className="profile-img border rounded mx-auto" />
          </Col>
          <Col className="mb-3" xs="12" sm="" xl="8">
            <ResponsiveListGroup>
              <ListGroupItem>Name: {this.state.dog.name}</ListGroupItem>
              <ListGroupItem>Litter: {this.state.dog.litter.name}</ListGroupItem>
              <ListGroupItem>Chip ID: {this.state.dog.chip}</ListGroupItem>
              <ListGroupItem>Gender: {this.state.dog.gender === 'M' ? 'Male' : 'Female'}</ListGroupItem>
              <ListGroupItemLink to={userDetailPageRoute(this.state.dog.instructor.id)}>
                Instructor: {this.state.dog.instructor.name}
              </ListGroupItemLink>
              <ListGroupItem>Status: {this.state.dog.active ? 'Active' : 'Inactive'}</ListGroupItem>
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
              <Input type="text" value={this.state.userName} onChange={this.updateNameFilter} placeholder="Filter by volunteer name" />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <RequestsDetailTable
                view="dog"
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
          <Col xs="" sm="auto" className="mr-2 mx-sm-2">
            <Link className="btn btn-secondary btn-lg btn-block" to={requestDogPageRoute(this.state.dog.id)}>Request Checkout</Link>
          </Col>
          <AdminControl>
            <Col xs="" sm="auto" className="ml-2 mx-sm-2">
              <Link className="btn btn-secondary btn-lg btn-block" to={editDogPageRoute(this.state.dog.id)}>Edit</Link>
            </Col>
          </AdminControl>
        </Row>
      </>
    );
  }
}

// export default DogDetailPage;
export default connect(
  state => ({
    isAdmin: state.auth.isAdmin,
  }),
  dispatch => ({
    getDog: id => dispatch(getDog(id)),
    getDogOutings: (id, filter) => dispatch(getDogOutings(id, filter)),
  }),
)(DogDetailPage);
