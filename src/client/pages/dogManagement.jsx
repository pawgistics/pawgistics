// @flow

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { Label, Container, Row, InputGroup, InputGroupAddon, Form, FormGroup, Input, Button } from 'reactstrap';

import { getDogs } from '../api/volunteer';
import DetailTable from '../components/detail-table';

import styles from '../styles/pages/dogManagement.m.scss';
// need to change this later!!

type Props = {
  getDogs: () => Promise,
}

class DogManagementPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { dogs: [] };
    this.props.getDogs()
      .then((response) => {
        if (response.success) {
          this.setState({ dogs: response.response });
        } else {
          // eslint-disable-next-line no-console
          console.log(response.message);
        }
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('Failed to get response from server.');
      });
  }

  render() {
    return (
      <Container>
        <Row className="mb-2">
          <h1>Dog Management Page</h1>
        </Row>
        <Form>
          <Row className="mb-2">
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" id="checkbox2" /> Active
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" id="checkbox2" /> Available for check out
              </Label>
            </FormGroup>
          </Row>
          <Row className="mb-4">
            <InputGroup>
              <Input type="text" className="form-control" placeholder="Search using keywords" id="inputGroup" />
              <InputGroupAddon addonType="append">
                <Button>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Row>
          <Row>
            <br />
            <DetailTable
              headings={['Dog Name', 'Dog ID', 'Custody']}
              keys={{ 'Dog Name': 'name', 'Dog ID': 'chipId', Custody: 'custody' }}
              items={_.map(this.state.dogs, dog => _.assign({}, dog, { custody: 'Canine Assistants' }))}
              detailRoute={{
                template: chipId => `/dog/${chipId}`,
                key: 'chipId',
              }}
            />
          </Row>
        </Form>
      </Container>
    );
  }
}

export default connect(null, dispatch => ({
  getDogs: () => dispatch(getDogs()),
}))(CSSModules(DogManagementPage, styles));
