// @flow

import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from '../components/select';
import { postDog } from '../api/admin';
import '../styles/pages/add-dog.m.scss';

import { USERS_PAGE_ROUTE } from '../routes';

type Props = {
  postDog(vals): Promise,
}

class AddUserPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      gender: undefined,
      admin: undefined,
      dob: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
    this.updateDOB = this.updateDOB.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updatePhone(e) {
    this.setState({ phone: e.target.value });
  }

  updateGender(value) {
    this.setState({ gender: value });
  }

  updateAdmin(value) {
    this.setState({ admin: value });
  }

  updateDOB(e) {
    this.setState({ dob: e.target.value });
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
    this.props.postDog(this.state)
      .then(() => {
        // TODO: Proper window notification
      }).catch((err) => {
        Window.alert(err.message);
      });
  }

  render() {
    return (
      <>
        <h1 className="display-4">Add User</h1>
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
                  Upload the picture of the user.
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
                <dt>Email</dt>
                <Input type="text" name="email" value={this.state.email} onChange={this.updateEmail} placeholder="email@pawgistics.com" />
              </FormGroup>
              <FormGroup>
                {/* <Label for="exampleGender">Gender</Label> */}
                <dt>Phone #</dt>
                <Input type="text" name="id" value={this.state.phone} onChange={this.updatePhone} placeholder="###-###-####" />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <dt>Gender</dt>
                <Select
                  options={[{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }]}
                  onSelectValue={this.updateGender}
                  isSearchable={false}
                />
              </FormGroup>
              <FormGroup>
                <dt>User Type</dt>
                <Select
                  options={[{ value: true, label: 'Administrator' }, { value: false, label: 'Volunteer' }]}
                  onSelectValue={this.updateAdmin}
                  isSearchable={false}
                />
              </FormGroup>
              <FormGroup>
                <dt>Member Since: </dt>
                <Input type="number" name="id" value={this.state.dob} onChange={this.updateDOB} placeholder="2005" />
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
              <Link to={USERS_PAGE_ROUTE}>
                <Button color="secondary" size="lg">BACK</Button>
              </Link>
              &nbsp;
              <Button color="primary" size="lg" onClick={this.handleSubmit}>SAVE</Button>
            </div>
          </h2>
        </div>
      </>
    );
  }
}
export default connect(null, dispatch => ({
  postDog: vals => dispatch(postDog(vals)),
}))(AddUserPage);
// export default AddUserPage;
