// @flow

import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from '../components/select';
import InstructorSelect from '../containers/instructor-select';
import LitterSelect from '../containers/litter-select';
import { updateDog } from '../api/admin';
import { getDog } from '../api/volunteer';
import '../styles/pages/addDog.m.scss';

type Props = {
  match: Object,
  getDog(id): Promise,
  updateDog(vals): Promise,
}

class DogEditPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      chip: '',
      name: '',
      instructor_id: '',
      litter_id: '',
      gender: 'M',
      active: true,
    };
    this.props.getDog(this.state.id)
      .then((dog) => {
        this.setState({
          chip: dog.chip,
          name: dog.name,
          instructor_id: dog.instructor.id,
          litter_id: dog.litter.id,
          gender: dog.gender,
          active: dog.active,
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
    this.updateName = this.updateName.bind(this);
    this.updateChip = this.updateChip.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateInstructorId = this.updateInstructorId.bind(this);
    this.updateLitterId = this.updateLitterId.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateGender = this.updateGender.bind(this);
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

  updateActive(value) {
    this.setState({ active: value });
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
    this.props.updateDog(this.state)
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
        <span styleName="my-class">Edit Dog</span>
        {/* <button className="btn btn-primary">Back</button>
        <Button color="primary">Save</Button> */}
        <Form>
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
                  Upload a new picture of the dog.
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
                  value={this.state.gender}
                  isSearchable={false}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <dt>Instructor</dt>
                <InstructorSelect
                  onSelectValue={this.updateInstructorId}
                  value={this.state.instructor_id}
                />
              </FormGroup>
              <FormGroup>
                <dt>Litter</dt>
                <LitterSelect
                  onSelectValue={this.updateLitterId}
                  value={this.state.litter_id}
                />
              </FormGroup>
              <FormGroup>
                <dt>Status</dt>
                <Select
                  options={[{ value: true, label: 'Active' }, { value: false, label: 'Inactive' }]}
                  onSelectValue={this.updateActive}
                  isSearchable={false}
                  value={this.state.active}
                />
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
              <Link to={`/dogDetail/${this.state.id}`}>
                <Button outline size="lg">BACK</Button>
              </Link>
              &nbsp;
              <Button color="secondary" size="lg" onClick={this.handleSubmit}>SAVE</Button>
              &nbsp;
              <Button color="primary" size="lg">REMOVE DOG</Button>
            </div>
          </h2>
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  updateDog: vals => dispatch(updateDog(vals)),
  getDog: id => dispatch(getDog(id)),
}))(DogEditPage);
// export default DogDetailPage;
