// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Container, Label, Form, Row, Col, FormGroup, Input, Button } from 'reactstrap';
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
      <Container fluid>
        <h1 className="display-4 mb-4">Dogs</h1>
        <Form>
          <Row className="align-items-center mb-2">
            <Col xs="auto" className="pr-0 text-nowrap">
              <LitterSelect
                fixedWidth
                value={this.state.filter.litter_id}
                onSelectValue={this.updateLitterFilter}
                placeholder="Filter by litter"
              />
            </Col>
            <Col xs="auto" className="pr-0 text-nowrap">
              <InstructorSelect
                fixedWidth
                value={this.state.filter.instructor_id}
                onSelectValue={this.updateInstructorFilter}
                placeholder="Filter by instructor"
              />
            </Col>
            <Col xs="auto" className="pr-0 text-nowrap">
              <FormGroup check inline className="mr-0">
                <Label check>
                  <Input type="checkbox" />Available for check out
                </Label>
              </FormGroup>
            </Col>
            <Col xs="auto" className="pr-0 text-nowrap">
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
            <Col sm="auto">
              <Link to={ADD_DOG_PAGE_ROUTE}>
                <Button color="secondary" size="lg">ADD DOG</Button>
              </Link>
            </Col>
          </Row>
        </AdminControl>
      </Container>
    );
  }
}

export default connect(null, dispatch => ({
  getDogs: filters => dispatch(getDogs(filters)),
}))(DogsPage);
