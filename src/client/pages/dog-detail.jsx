// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Input } from 'reactstrap';
import ResponsiveListGroup from '../containers/responsive-list-group';
import OutingDetailTable from '../containers/outing-detail-table';
import AdminControl from '../containers/admin-control';
import { getDog } from '../api/volunteer';
import '../styles/pages/detail-page.m.scss';

import { DOGS_PAGE_ROUTE, editDogPageRoute } from '../routes';

type Props = {
  match: Object,
  getDog(id): Promise,
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
    };
    this.props.getDog(props.match.params.id)
      .then((dog) => {
        this.setState({ dog });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  render() {
    return (
      <>
        <span className="title-text">Dog Details</span>
        <Row noGutters>
          <Col className="d-flex mb-3 mr-3" xs="12" sm="auto">
            <img src={this.state.dog.uri} alt={this.state.dog.name} styleName="profile-img" className="border rounded mx-auto" />
          </Col>
          <Col className="mb-3" xs="12" sm="">
            <ResponsiveListGroup items={[
              `Name: ${this.state.dog.name}`,
              `Litter: ${this.state.dog.litter.name}`,
              `Chip ID: ${this.state.dog.chip}`,
              `Gender: ${this.state.dog.gender === 'M' ? 'Male' : 'Female'}`,
              `Instructor: ${this.state.dog.instructor.name}`,
              'Custody: Canine Assistants',
              `Status: ${this.state.dog.active ? 'Active' : 'Inactive'}`,
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
            <Input type="text" placeholder="Filter by volunteer name" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <OutingDetailTable
              subjectName="Volunteer"
              outings={[
              { name: 'John', date: '10/10/17', action: 'Took on a walk' },
              { name: 'John', date: '10/10/17', action: 'Requested an outing' },
              { name: 'Jane', date: '10/10/17', action: 'Signed back in' }]}
            />
          </Col>
        </Row>
        <Row noGutters className="justify-content-center">
          <Col xs="auto" className="mx-2">
            <Link to={DOGS_PAGE_ROUTE}>
              <Button color="secondary" size="lg">BACK</Button>
            </Link>
          </Col>
          <AdminControl>
            <Col xs="auto" className="mx-2">
              <Link to={editDogPageRoute(this.state.dog.id)}>
                <Button color="primary" size="lg">EDIT</Button>
              </Link>
            </Col>
          </AdminControl>
        </Row>
      </>
    );
  }
}

// export default DogDetailPage;
export default connect(null, dispatch => ({
  getDog: id => dispatch(getDog(id)),
}))(DogDetailPage);
