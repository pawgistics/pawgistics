// @flow
import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Label, Form, Row, Col, FormGroup, Input, Button } from 'reactstrap';
import { submitRequest } from '../api/volunteer';

type Props = {
  match: Object,
  history: Object,
  submitRequest(request): Promise,
}

class OutingRequestPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      pickup_date: '',
      return_date: '',
      description: '',
      dog_id: this.props.match.params.id,
    };
    this.updatePickupDate = this.updatePickupDate.bind(this);
    this.updateReturnDate = this.updateReturnDate.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updatePickupDate(e) { this.setState({ pickup_date: e.target.value }); }
  updateReturnDate(e) { this.setState({ return_date: e.target.value }); }
  updateDescription(e) { this.setState({ description: e.target.value }); }
  handleSubmit() {
    /* eslint-disable no-alert */
    this.props.submitRequest(this.state)
      .then(() => alert('Request submitted successfully!'))
      .catch(err => alert(err.message));
  }

  render() {
    return (
      <>
        <span className="title-text">Outing Request</span>
        <Form>
          <br />
          <Row>
            <Col sm={8}>
              <Label for="Date">Pickup Date</Label>
              <Input type="date" name="date" id="start" onChange={this.updatePickupDate} value={this.state.pickup_date} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={8}>
              <Label for="Date">Return Date</Label>
              <Input type="date" name="date" id="end" onChange={this.updateReturnDate} value={this.state.return_date} />
            </Col>
          </Row>
          <br />
          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>Outing Description</h5>
            </legend>
            <Col sm={10}>
              <Input
                type="textarea"
                name="text"
                id="desc"
                placeholder="Please provide description of what you expect to do on the outing."
                onChange={this.updateDescription}
                value={this.state.description}
              />
            </Col>
          </FormGroup>
          <br />
          <br />
          <Row noGutters className="justify-content-center">
            <Col xs="4" sm="auto" className="mr-2 mx-sm-2">
              <Button block outline size="lg" onClick={this.props.history.goBack}>Back</Button>
            </Col>
            <Col xs="4" sm="auto" className="mr-2 mx-sm-2">
              <Button block size="lg" onClick={this.handleSubmit}>Request Dog</Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  submitRequest: request => dispatch(submitRequest(request)),
}))(OutingRequestPage);
