// @flow
import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Label, Form, Row, Col, FormGroup, Input, Button } from 'reactstrap';
import { submitCheckout } from '../api/volunteer';

type Props = {
  match: Object,
  history: Object,
  user_id: String,
  submitCheckout(request): Promise,
}

const mapStateToProps = state => ({
  user_id: state.auth.id,
});

class OutingRequestPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      desc: '',
      user_id: this.props.user_id,
      dog_id: this.props.match.params.id,
    };
    this.updateStart = this.updateStart.bind(this);
    this.updateEnd = this.updateEnd.bind(this);
    this.updateDesc = this.updateDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateStart(e) { this.setState({ start: e.target.value }); }
  updateEnd(e) { this.setState({ end: e.target.value }); }
  updateDesc(e) { this.setState({ desc: e.target.value }); }
  handleSubmit() {
    /* eslint-disable no-alert */
    this.props.submitCheckout(this.state)
      .then(() => alert('Request submit successfully!'))
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
              <Label for="Date">Start Date</Label>
              <Input type="date" name="date" id="start" onChange={this.updateStart} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={8}>
              <Label for="Date">Return Date</Label>
              <Input type="date" name="date" id="end" onChange={this.updateEnd} />
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
                onChange={this.updateDesc}
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

export default connect(mapStateToProps, dispatch => ({
  submitCheckout: request => dispatch(submitCheckout(request)),
}))(OutingRequestPage);
