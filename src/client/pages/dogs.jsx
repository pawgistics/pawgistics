// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
// import NaviconRound from 'react-icons/lib/io/navicon-round';
import { Label, Form, Row, Col, Button, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getDogs } from '../api/volunteer';
import AdminControl from '../containers/admin-control';
import DogDetailTable from '../containers/dog-detail-table';
import InstructorSelect from '../containers/instructor-select';
import LitterSelect from '../containers/litter-select';

import { ADD_DOG_PAGE_ROUTE } from '../routes';

type Props = {
  getDogs: (filters: {}) => Promise,
}

class DogsPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
      filter: {
        name: '',
        litter_id: '',
        instructor_id: '',
        available: false,
        inactive: false,
      },
      loading: true,
    };

    this.updateDogs();

    this.updateDogs = this.updateDogs.bind(this);
    this.loadMoreDogs = this.loadMoreDogs.bind(this);
    this.updateDogsDebounced = _.debounce(this.updateDogs, 250);

    this.updateFilterState = this.updateFilterState.bind(this);
    this.updateNameFilter = this.updateNameFilter.bind(this);
    this.updateLitterFilter = this.updateLitterFilter.bind(this);
    this.updateInstructorFilter = this.updateInstructorFilter.bind(this);
    this.updateInactiveFilter = this.updateInactiveFilter.bind(this);
  }

  updateDogs() {
    this.setState({ loading: true });
    this.props.getDogs(this.state.filter)
      .then((dogs) => {
        this.setState({ dogs, loading: false });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  loadMoreDogs() {
    this.setState({ loading: true });
    this.props.getDogs({
      ...this.state.filter,
      before: this.state.dogs[this.state.dogs.length - 1].updated_at,
    })
      .then((dogs) => {
        this.setState({ dogs: _.concat(this.state.dogs, dogs), loading: false });
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
      this.updateDogsDebounced();
    });
  }

  updateLitterFilter(value) {
    this.updateFilterState({
      litter_id: value,
    }, () => {
      this.updateDogs();
    });
  }

  updateInstructorFilter(value) {
    this.updateFilterState({
      instructor_id: value,
    }, () => {
      this.updateDogs();
    });
  }

  updateInactiveFilter(e) {
    this.updateFilterState({
      inactive: e.target.checked,
    }, () => {
      this.updateDogs();
    });
  }

  render() {
    return (
      <>
        <span className="title-text">Dogs</span>
        <Form>
          <Row noGutters className="align-items-center mb-2">
            <Col xs="12" sm="6" lg="4" xl="3" className="pr-sm-2 mb-2 text-nowrap">
              <LitterSelect
                value={this.state.filter.litter_id}
                onSelectValue={this.updateLitterFilter}
                placeholder="Filter by litter"
              />
            </Col>
            <Col xs="12" sm="6" lg="4" xl="3" className="pl-sm-2 pr-lg-0 mb-2 text-nowrap">
              <InstructorSelect
                value={this.state.filter.instructor_id}
                onSelectValue={this.updateInstructorFilter}
                placeholder="Filter by instructor"
              />
            </Col>
            <Col xs="auto" className="pl-lg-3 pr-3 pr-lg-0 mb-2 text-nowrap">
              <FormGroup check inline className="mr-0">
                <Label check>
                  <Input type="checkbox" />Available for check out
                </Label>
              </FormGroup>
            </Col>
            <Col xs="auto" className="pl-xl-3 mb-2 text-nowrap">
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
            <DogDetailTable
              dogs={this.state.dogs}
              loading={this.state.loading}
              onReload={this.updateDogs}
            />
          </Col>
        </Row>
        <Row noGutters className="justify-content-center">
          <Col xs="" sm="auto" className="mr-2 mx-sm-2">
            <Button block outline size="lg" onClick={this.loadMoreDogs}>Load More</Button>
          </Col>
          <AdminControl>
            <Col xs="" sm="auto" className="ml-2 mx-sm-2">
              <Link className="btn btn-secondary btn-lg btn-block" to={ADD_DOG_PAGE_ROUTE}>Add Dog</Link>
            </Col>
          </AdminControl>
        </Row>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getDogs: filters => dispatch(getDogs(filters)),
}))(DogsPage);
