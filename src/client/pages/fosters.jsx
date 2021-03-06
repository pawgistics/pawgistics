// @flow

import React from 'react';
import { Button, InputGroup, InputGroupAddon, Table, Form, Col, Input } from 'reactstrap';

// eslint-disable-next-line react/prefer-stateless-function
class FostersPage extends React.Component<Props> {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form>
        <span className="title-text">Fosters</span>
        {/* <button className="btn btn-primary">Back</button>
        <Button color="primary">Save</Button> */}
        <div>
          <Col>
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button size="lg" block>Create New Table</Button>
            </div>
            <br />
            <br />
          </Col>
          <br />
          <Col>
            <InputGroup>
              <Input type="text" className="form-control" placeholder="Search for names" id="inputGroup" />
              <InputGroupAddon addonType="append">
                <Button>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <br />
          <Col>
            <br />
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Person</th>
                  <th>Dog</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Samuel</td>
                  <td>Cooper</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Maggie</td>
                  <td>Coco</td>
                </tr>
                <tr>
                  <th scope="row">Add more</th>
                  <td><Button color="info" size="lg">Add User</Button></td>
                  <td><Button color="info" size="lg">Add Dog</Button></td>
                </tr>
              </tbody>
            </Table>
            <br />
            <br />
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Person</th>
                  <th>Dog</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Samuel</td>
                  <td>Cooper</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>Pinky</td>
                </tr>
                <tr>
                  <th scope="row">Add more</th>
                  <td> <Button color="info" size="lg">Add User</Button></td>
                  <td> <Button color="info" size="lg">Add Dog</Button></td>
                </tr>
              </tbody>
            </Table>
            <br />
            {/* <UserDetailTable users={this.state.users} /> */}
          </Col>
        </div>
        <div className="footer">
          <br />
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button size="lg">Add User</Button>
          </div>
        </div>
        <br />
        <br />
      </Form>
    );
  }
}

// export default connect(null, dispatch => ({
//   getUsers: () => dispatch(getUsers()),
// }))(FostersPage);
export default FostersPage;
