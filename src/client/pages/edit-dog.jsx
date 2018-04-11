// @flow

import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input, FormText, Label } from 'reactstrap';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import ResponsiveCols from '../components/responsive-cols';
import Select from '../components/select';
import InstructorSelect from '../containers/instructor-select';
import LitterSelect from '../containers/litter-select';

import { AlertConsumer } from '../util/alert';

import { getDog } from '../api/volunteer';
import { updateDog } from '../api/admin';

import '../styles/pages/edit-page.m.scss';

type Props = {
  match: Object,
  history: Object,
  getDog(id): Promise,
  updateDog(id, dog): Promise,
  showAlert(color, text): void,
}

class EditDogPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      dog: {
        name: '',
        litter_id: '',
        chip: '',
        gender: '',
        instructor_id: '',
        active: '',
        uri: '',
        new_img: undefined,
      },
      hovering_img: false,
    };

    this.updateDogState = this.updateDogState.bind(this);
    this.fetchDog = this.fetchDog.bind(this);
    this.fetchDog();

    this.updateName = this.updateName.bind(this);
    this.updateChip = this.updateChip.bind(this);
    this.updateLitterId = this.updateLitterId.bind(this);
    this.updateInstructorId = this.updateInstructorId.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateActive = this.updateActive.bind(this);

    this.updateImage = this.updateImage.bind(this);

    this.saveDog = this.saveDog.bind(this);
  }

  updateDogState(update) { this.setState({ dog: { ...this.state.dog, ...update } }); }
  fetchDog() {
    this.props.getDog(this.state.id)
      .then((dog) => {
        this.updateDogState({
          name: dog.name,
          litter_id: dog.litter.id,
          chip: dog.chip,
          instructor_id: dog.instructor.id,
          gender: dog.gender,
          active: dog.active,
          uri: dog.uri,
        });
      })
      .catch((err) => {
        this.props.showAlert('danger', err.message);
      });
  }

  updateName(e) { this.updateDogState({ name: e.target.value }); }
  updateChip(e) { this.updateDogState({ chip: e.target.value && +e.target.value }); }
  updateLitterId(value) { this.updateDogState({ litter_id: value }); }
  updateInstructorId(value) { this.updateDogState({ instructor_id: value }); }
  updateGender(value) { this.updateDogState({ gender: value }); }
  updateActive(value) { this.updateDogState({ active: value }); }

  updateImage(files) {
    this.setState({ hovering_img: false });
    const reader = new FileReader();
    const file = files[0];
    reader.onload = upload => this.updateDogState({ new_img: upload.target.result });
    reader.readAsDataURL(file);
  }

  saveDog() {
    this.props.updateDog(this.state.id, this.state.dog)
      .then(() => {
        this.props.showAlert('success', 'Dog saved successfully.');
      }).catch((err) => {
        this.props.showAlert('danger', err.message);
      });
  }

  render() {
    return (
      <>
        <span className="title-text">Edit Dog</span>
        <Form>
          <Row noGutters>
            <Col className="d-flex mb-3 mr-4 align-items-center" xs="12" sm="auto">
              <div className="mx-auto">
                <Dropzone
                  styleName={`dropzone${this.state.hovering_img ? ' hover' : ''}`}
                  onDrop={this.updateImage}
                  onDragEnter={() => this.setState({ hovering_img: true })}
                  onDragLeave={() => this.setState({ hovering_img: false })}
                >
                  <div
                    styleName="overlay-img"
                    style={{ backgroundImage: `url(${this.state.dog.new_img || this.state.dog.uri})` }}
                    className="profile-img"
                  />
                </Dropzone>
                <FormText styleName="help-text">
                  Drop an image in the space above, or click it to select images to upload.
                </FormText>
              </div>
            </Col>
            <Col className="mb-3" xs="12" sm="" xl="8">
              <ResponsiveCols equalWidth>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input type="text" id="name" value={this.state.dog.name} onChange={this.updateName} />
                </FormGroup>
                <FormGroup>
                  <Label for="litter">Litter</Label>
                  <LitterSelect
                    inputId="litter"
                    value={this.state.dog.litter_id}
                    onSelectValue={this.updateLitterId}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="chip_id">Chip ID</Label>
                  <Input type="number" id="chip_id" value={this.state.dog.chip} onChange={this.updateChip} />
                </FormGroup>
                <FormGroup>
                  <Label for="gender">Gender</Label>
                  <Select
                    inputId="gender"
                    options={[{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }]}
                    value={this.state.dog.gender}
                    onSelectValue={this.updateGender}
                    isSearchable={false}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="instructor">Instructor</Label>
                  <InstructorSelect
                    inputId="instructor"
                    value={this.state.dog.instructor_id}
                    onSelectValue={this.updateInstructorId}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Select
                    inputId="status"
                    options={[{ value: true, label: 'Active' }, { value: false, label: 'Inactive' }]}
                    onSelectValue={this.updateActive}
                    isSearchable={false}
                    value={this.state.dog.active}
                  />
                </FormGroup>
              </ResponsiveCols>
            </Col>
          </Row>
        </Form>
        <Row noGutters className="justify-content-center">
          <Col xs="auto" className="mx-2">
            <Button outline size="lg" onClick={this.props.history.goBack}>BACK</Button>
          </Col>
          <Col xs="auto" className="mx-2">
            <Button size="lg" onClick={this.saveDog}>SAVE</Button>
          </Col>
          <Col xs="auto" className="mx-2">
            <Button color="primary" size="lg">REMOVE DOG</Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getDog: id => dispatch(getDog(id)),
  updateDog: (id, dog) => dispatch(updateDog(id, dog)),
}))(props => (
  <AlertConsumer>
    {({ showAlert }) => <EditDogPage {...props} showAlert={showAlert} />}
  </AlertConsumer>
));
