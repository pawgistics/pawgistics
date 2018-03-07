// @flow

import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { postDog } from '../api/admin';
import '../styles/pages/addDog.m.scss';

// eslint-disable-next-line
type Props = {
  postDog(vals): Promise,
}

class AddDogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chipId: null,
      name: null,
      litter: null,
      color: 'red',
      shape: 'circle',
      gender: 'M',
      dob: null,
      // eslint-disable-next-line
      fid: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateChipId = this.updateChipId.bind(this);
    this.updateLitter = this.updateLitter.bind(this);
    this.updateColor = this.updateColor.bind(this);
    this.updateShape = this.updateShape.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateDOB = this.updateDOB.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  updateChipId(e) {
    this.setState({ chipId: e.target.value });
  }

  updateLitter(e) {
    this.setState({ litter: e.target.value });
  }

  updateColor(e) {
    this.setState({ color: e.target.value });
  }

  updateShape(e) {
    this.setState({ shape: e.target.value });
  }

  updateGender(e) {
    this.setState({ gender: e.target.value });
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
    this.props.postDog(JSON.stringify(this.state))
      .then(() => {
        // TODO: Proper window notification
      }).catch((err) => {
        Window.alert(err.message);
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
                <Input type="number" name="id" value={this.state.chipId} onChange={this.updateChipId} placeholder="Chip ID" />
              </FormGroup>
              <FormGroup>
                {/* <Label for="exampleGender">Gender</Label> */}
                <dt>Gender</dt>
                <Input type="select" name="gender" value={this.state.gender} onChange={this.updateGender}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Input>
              </FormGroup>
              <FormGroup>
                {/* <Label for="exampleDoB">DOB</Label> */}
                <dt>DoB</dt>
                <Input type="date" name="dob" value={this.state.dob} onChange={this.updateDOB} placeholder="Select date" />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <dt>Litter</dt>
                <Input type="text" name="litter" value={this.state.litter} onChange={this.updateLitter} />
              </FormGroup>
              <FormGroup>
                <dt>Marking Shape</dt>
                <Input type="select" name="shape" value={this.state.shape} onChange={this.updateShape} >
                  <option>square</option>
                  <option>circle</option>
                  <option>triangle</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <dt>Marking Color</dt>
                <Input type="select" name="color" value={this.state.color} onChange={this.updateColor}>
                  <option>red</option>
                  <option>blue</option>
                  <option>orange</option>
                  <option>green</option>
                  <option>white</option>
                  <option>black</option>
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
              <Button color="secondary" size="lg">BACK</Button>{' '}
              <Button color="danger" size="lg" onClick={this.handleClick}>SAVE</Button>
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
