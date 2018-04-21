// @flow

import React from 'react';
import { FormGroup, Input, Label, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { postLitter } from '../api/admin';

type Props = {
  history: Object,
  postLitter(val): Promise,
}

class AddLitter extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.updateName = this.updateName.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    if (this.state === '') {
      /* eslint-disable no-alert */
      alert('Please enter a litter name');
    }
    this.props.postLitter(this.state)
      .then(() => {
        alert(`${this.state.name} added successfully`);
      }).catch((err) => {
        alert(err.message);
      });
  }

  updateName(e) { this.setState({ name: e.target.value }); }

  render() {
    return (
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" id="name" placeholder="Litter Name" value={this.state.name || ''} onChange={this.updateName} />
        <Row noGutters className="justify-content-center">
          <Col xs="" sm="auto" className="mr-2 mx-sm-2">
            <Button block outline size="lg" onClick={this.props.history.goBack}>Back</Button>
          </Col>
          <Col xs="" sm="auto" className="ml-2 mx-sm-2">
            <Button block size="lg" onClick={this.onSave}>Create</Button>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default connect(null, dispatch => ({
  postLitter: val => dispatch(postLitter(val)),
}))(AddLitter);
