// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Table, Button } from 'reactstrap';

import { getDogs } from '../api/volunteer';

class AddLitterPage extends React.Component<Props> {
  // eslint-disable-next-line no-useless-constructor
  render() {
    return (
      <>
        <span className="title-text">Add Litter</span>
        {/* <button className="btn btn-primary">Back</button>
        <Button color="primary">Save</Button> */}
        <Form>
          <Col>
            <br />
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Litter Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>ABC</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>DEF</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>GHI</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>XYZ</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <br />
          <Row noGutters className="justify-content-center">
            <Col xs="4" sm="auto" className="mr-2 mx-sm-2">
              <Button block size="lg">Add New Litter</Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getDogs: () => dispatch(getDogs()),
}))(AddLitterPage);
