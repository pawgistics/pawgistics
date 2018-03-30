// @flow

import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postDog } from '../api/admin';
import { getAdmins, getLitters } from '../api/volunteer';
// import StrIdDropdown from '../components/str-id-dropdown';
import '../styles/pages/addDog.m.scss';

// eslint-disable-next-line
type Props = {
  postDog(vals): Promise,
  getAdmins: () => Promise,
  getLitters: () => Promise,
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
      admins: [],
      litters: [],
    };
    this.props.getAdmins()
      .then((instructors) => {
        this.setState({ admins: instructors });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
    this.props.getLitters()
      .then((litters) => {
        this.setState({ litters });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateInstructor = this.updateInstructor.bind(this);
    this.updateChip = this.updateChip.bind(this);
    this.updateLitter = this.updateLitter.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  updateInstructor(e) {
    this.setState({ instructor_id: e.target.value });
  }

  updateChip(e) {
    this.setState({ chip: e.target.value });
  }

  updateLitter(e) {
    this.setState({ litter_id: e.target.value });
  }

  updateGender(e) {
    this.setState({ gender: e.target.value });
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

  handleClick() {
    this.handleSubmit();
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
                <Input type="select" name="gender" value={this.state.gender} onChange={this.updateGender}>
                  <option selected="selected">--</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <dt>Instructor</dt>
                <Input type="select" name="instructor" value={this.state.instructor_id} onChange={this.updateInstructor} >
                  <option selected="selected">--</option>
                  {this.state.admins.map(admin => (
                    <option value={admin.id}>
                      {admin.first_name} {admin.last_name}
                    </option>))}
                </Input>
              </FormGroup>
              <FormGroup>
                <dt>Litter</dt>
                <Input type="select" name="litter" value={this.state.litter_id} onChange={this.updateLitter} >
                  <option selected="selected">--</option>
                  {this.state.litters.map(litter => (
                    <option value={litter.id}>
                      {litter.name}
                    </option>))}
                </Input>
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
              <Button color="primary" size="lg" onClick={this.handleClick}>SAVE</Button>
            </div>
          </h2>
        </div>
      </div>
    );
  }
}
export default connect(null, dispatch => ({
  postDog: vals => dispatch(postDog(vals)),
  getAdmins: () => dispatch(getAdmins()),
  getLitters: () => dispatch(getLitters()),
}))(AddDogPage);
// export default AddDogPage;
