// @flow

import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from '../components/select';
import InstructorSelect from '../containers/instructor-select';
import LitterSelect from '../containers/litter-select';
import { postDog } from '../api/admin';
import '../styles/pages/addDog.m.scss';

// eslint-disable-next-line
type Props = {
  postDog(vals): Promise,
}

class AddDogPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      chip: '',
      name: '',
      instructor_id: '',
      litter_id: '',
      gender: 'M',
      fid: '',
    };
    this.updateName = this.updateName.bind(this);
    this.updateChip = this.updateChip.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateInstructorId = this.updateInstructorId.bind(this);
    this.updateLitterId = this.updateLitterId.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  updateChip(e) {
    this.setState({ chip: e.target.value });
  }

  updateGender(value) {
    this.setState({ gender: value });
  }

  updateInstructorId(value) {
    this.setState({ instructor_id: value });
  }

  updateLitterId(value) {
    this.setState({ litter_id: value });
  }

  updateImage(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (upload) => {
      this.setState({
        // eslint-disable-next-line
        data_uri: upload.target.result,
        // eslint-disable-next-line
        filename: file.name,
        // eslint-disable-next-line
        filetype: file.type,
      });
    };
    reader.readAsDataURL(file);
  }

  handleSubmit() {
    // eslint-disable-next-line
    this.props.postDog(JSON.stringify(this.state))
      .then(() => {
        // TODO: Proper window notification
      }).catch((err) => {
        // eslint-disable-next-line
        alert(err.message);
      });
  }

  render() {
    return (
      <div>
        <span styleName="my-class">Add Dog Page</span>
        {/* <button className="btn btn-primary">Back</button>
        <Button color="primary">Save</Button> */}
        <Form onSubmit={this.handleSubmit}>
          <br />
          <Row>
            <Col xs="3">
              <FormGroup>
                {/* <Label for="examplePicFile">Profile picture</Label> */}
                <dt>Profile picture</dt>
                <Input
                  type="file"
                  name="profile"
                  onChange={this.updateImage}
                  // ref={(file) => {
                  //   this.state.image = file;
                  // }}
                />
                <FormText color="muted">
                  Upload the picture of the dog.
                </FormText>
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                {/* <Label for="exampleName">Name</Label> */}
                <dt>Name</dt>
                <Input type="text" name="name" value={this.state.name} onChange={this.updateName} placeholder="Name" />
              </FormGroup>
              <FormGroup>
                {/* <Label for="exampleDogID">Dog ID</Label> */}
                <dt>Dog ID</dt>
                <Input type="number" name="id" value={this.state.chip} onChange={this.updateChip} placeholder="Chip ID" />
              </FormGroup>
              <FormGroup>
                {/* <Label for="exampleGender">Gender</Label> */}
                <dt>Gender</dt>
                <Select
                  options={[{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }]}
                  onSelectValue={this.updateGender}
                  isSearchable={false}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <dt>Instructor</dt>
                <InstructorSelect onSelectValue={this.updateInstructorId} />
              </FormGroup>
              <FormGroup>
                <dt>Litter</dt>
                <LitterSelect onSelectValue={this.updateLitterId} />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <br />
        <br />
        <br />
        <div className="footer">
          <h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to="/dogManagement">
                <Button color="secondary" size="lg">BACK</Button>{' '}
              </Link>
              &nbsp;
              <Button color="primary" size="lg" onClick={this.handleSubmit}>SAVE</Button>
            </div>
          </h2>
        </div>
      </div>
    );
  }
}
export default connect(null, dispatch => ({
  postDog: vals => dispatch(postDog(vals)),
}))(AddDogPage);
// export default AddDogPage;
