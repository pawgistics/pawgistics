// @flow

import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input, FormText, Label } from 'reactstrap';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import ResponsiveCols from '../components/responsive-cols';
import Select from '../components/select';

import { AlertConsumer } from '../util/alert';

import { getUser } from '../api/volunteer';
import { updateUser } from '../api/admin';

import '../styles/pages/edit-page.m.scss';

type Props = {
  match: Object,
  history: Object,
  getUser(id): Promise,
  updateUser(id, user): Promise,
  showAlert(color, text): void,
}

class EditUserPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      user: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        admin: '',
        active: '',
        uri: '',
        new_img: undefined,
      },
      hovering_img: false,
    };

    this.fetchUser = this.fetchUser.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.fetchUser();

    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePhoneNumber = this.updatePhoneNumber.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
    this.updateActive = this.updateActive.bind(this);

    this.updateImage = this.updateImage.bind(this);

    this.saveUser = this.saveUser.bind(this);
  }

  updateUserState(update) { this.setState({ user: { ...this.state.user, ...update } }); }
  fetchUser() {
    this.props.getUser(this.state.id)
      .then((user) => {
        this.updateUserState({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          admin: user.admin,
          active: user.active,
          uri: user.uri,
        });
      })
      .catch((err) => {
        this.props.showAlert('danger', err.message);
      });
  }

  updateFirstName(e) { this.updateUserState({ first_name: e.target.value }); }
  updateLastName(e) { this.updateUserState({ last_name: e.target.value }); }
  updateEmail(e) { this.updateUserState({ email: e.target.value }); }
  updatePhoneNumber(e) { this.updateUserState({ phone_number: e.target.value }); }
  updateAdmin(value) { this.updateUserState({ admin: value }); }
  updateActive(value) { this.updateUserState({ active: value }); }

  updateImage(files) {
    this.setState({ hovering_img: false });
    const reader = new FileReader();
    const file = files[0];
    reader.onload = upload => this.updateUserState({ new_img: upload.target.result });
    reader.readAsDataURL(file);
  }

  saveUser() {
    this.props.updateUser(this.state.id, this.state.user)
      .then(() => {
        this.props.showAlert('success', 'User saved successfully.');
      }).catch((err) => {
        this.props.showAlert('danger', err.message);
      });
  }

  render() {
    return (
      <>
        <span className="title-text">Edit User</span>
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
                    style={{ backgroundImage: `url(${this.state.user.new_img || this.state.user.uri})` }}
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
                  <Label for="first_name">First Name</Label>
                  <Input type="text" id="first_name" value={this.state.user.first_name} onChange={this.updateFirstName} />
                </FormGroup>
                <FormGroup>
                  <Label for="last_name">Last Name</Label>
                  <Input type="text" id="last_name" value={this.state.user.last_name} onChange={this.updateLastName} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="text" id="email" value={this.state.user.email} onChange={this.updateEmail} />
                </FormGroup>
                <FormGroup>
                  <Label for="phone_number">Phone #</Label>
                  <Input type="text" id="phone_number" value={this.state.user.phone_number} onChange={this.updatePhoneNumber} />
                </FormGroup>
                <FormGroup>
                  <Label for="user_type">User Type</Label>
                  <Select
                    inputId="user_type"
                    options={[{ value: false, label: 'Volunteer' }, { value: true, label: 'Instructor' }]}
                    onSelectValue={this.updateAdmin}
                    isSearchable={false}
                    value={this.state.user.admin}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Select
                    inputId="status"
                    options={[{ value: true, label: 'Active' }, { value: false, label: 'Inactive' }]}
                    onSelectValue={this.updateActive}
                    isSearchable={false}
                    value={this.state.user.active}
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
            <Button size="lg" onClick={this.saveUser}>SAVE</Button>
          </Col>
          <Col xs="auto" className="mx-2">
            <Button color="primary" size="lg">REMOVE USER</Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getUser: id => dispatch(getUser(id)),
  updateUser: (id, user) => dispatch(updateUser(id, user)),
}))(props => (
  <AlertConsumer>
    {({ showAlert }) => <EditUserPage {...props} showAlert={showAlert} />}
  </AlertConsumer>
));
