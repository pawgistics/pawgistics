// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
// import NaviconRound from 'react-icons/lib/io/navicon-round';
import { Label, Form, Row, Col, FormGroup, Input, Button } from 'reactstrap';
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
        include_inactive: false,
      },
    };

    this.updateDogs();

    this.updateDogs = this.updateDogs.bind(this);
    this.updateDogsDebounced = _.debounce(this.updateDogs, 250);
    this.updateNameFilter = this.updateNameFilter.bind(this);
    this.updateLitterFilter = this.updateLitterFilter.bind(this);
    this.updateInstructorFilter = this.updateInstructorFilter.bind(this);
  }

  updateDogs() {
    this.props.getDogs(this.state.filter)
      .then((dogs) => {
        this.setState({ dogs });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  updateNameFilter(e) {
    this.setState({
      filter: {
        ...this.state.filter,
        name: e.target.value,
      },
    }, () => {
      this.updateDogsDebounced();
    });
  }

  updateLitterFilter(value) {
    this.setState({
      filter: {
        ...this.state.filter,
        litter_id: value,
      },
    }, () => {
      this.updateDogs();
    });
  }

  updateInstructorFilter(value) {
    this.setState({
      filter: {
        ...this.state.filter,
        instructor_id: value,
      },
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
                  <Input type="checkbox" />Include inactive
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
            <DogDetailTable dogs={this.state.dogs} />
          </Col>
        </Row>
        <AdminControl>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Link to={ADD_DOG_PAGE_ROUTE}>
                <Button color="secondary" size="lg">ADD DOG</Button>
              </Link>
            </Col>
          </Row>
        </AdminControl>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getDogs: filters => dispatch(getDogs(filters)),
}))(DogsPage);
