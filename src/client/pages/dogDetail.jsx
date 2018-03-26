// @flow

import React from 'react';
import { connect } from 'react-redux';
import { /* Link, */InputGroupAddon, InputGroup, Row, Col, Button, Form, FormGroup, ListGroup, ListGroupItem, Input, Table } from 'reactstrap';
import { getDog } from '../api/volunteer';
import '../styles/pages/dogDetail.m.scss';
// import { DOG_EDIT_PAGE_ROUTE } from '../../shared/routes';
// must fix this later.

type Props = {
  // data: Object,
  match: Object,
  getDog(id): Promise,
}

class DogDetailPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { dog: {} };
    this.state.id = props.match.params.id;
    this.props.getDog(this.state.id)
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
      <div>
        <span styleName="my-class">Dog Detail Page</span>
        {/* <button className="btn btn-primary">Back</button>
        <Button color="primary">Save</Button> */}
        <Form>
          <br />
          <Row>
            <Col xs="3">
              <img src={this.state.dog.uri} alt={this.state.dog.name} className="border rounded" />
            </Col>
            <Col xs="4">
              <ListGroup>
                <ListGroupItem className="justify-content-between">Name: {this.state.dog.name} </ListGroupItem>
                <ListGroupItem className="justify-content-between">Chip ID: {this.state.dog.chip} </ListGroupItem>
                <ListGroupItem className="justify-content-between">Gender: {this.state.dog.gender} </ListGroupItem>
                <ListGroupItem className="justify-content-between">DoB: {this.state.dog.dob} </ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">Marking: {this.state.dog.color} {this.state.dog.shape}</ListGroupItem>
                  <ListGroupItem className="justify-content-between">Custody: Canine Assistants </ListGroupItem>
                  <Form inline>
                    <div className="form-group">
                      <ListGroupItem className="justify-content-between">Status: Training </ListGroupItem>
                      {/* <Link
                        to={{
                          pathname: `/dogEdit/${this.state.dog.chip}`,
                        }}
                      > */}
                      <Button>Edit</Button>{' '}
                      {/* </Link> */}
                    </div>
                  </Form>
                </ListGroup>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <br />
        <br />
        <InputGroup>
          <Input type="text" className="form-control" placeholder="Search using keywords" id="inputGroup" />
          <InputGroupAddon addonType="append">
            <Button>Search</Button>
          </InputGroupAddon>
        </InputGroup>
        <br />
        <Table hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name of person</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">10/10/17</th>
              <td>Steve</td>
              <td>Requested to walk Fido</td>
            </tr>
            <tr>
              <th scope="row">10/10/17</th>
              <td>Adam</td>
              <td>Approved Steve to walk Fido</td>
            </tr>
            <tr>
              <th scope="row">10/10/17</th>
              <td>Steve</td>
              <td>Signed Fido back in</td>
            </tr>
            <tr>
              <th scope="row" />
              <td />
              <td />
            </tr>
            <tr>
              <th scope="row" />
              <td />
              <td />
            </tr>
            <tr>
              <th scope="row" />
              <td />
              <td />
            </tr>
          </tbody>
        </Table>
        <br />
        <br />
        <br />
        <div className="footer">
          <h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button color="secondary" size="lg">BACK</Button>{' '}
            </div>
          </h2>
        </div>
      </div>
    );
  }
}

// export default CSSModules(DogDetailPage, styles);
// // export default DogDetailPage;
export default connect(null, dispatch => ({
  getDog: id => dispatch(getDog(id)),
}))(DogDetailPage);
