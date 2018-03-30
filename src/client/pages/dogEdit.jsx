// @flow

import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { upDateDog } from '../api/admin';
import { getAdmins, getLitters, getDog } from '../api/volunteer';
import '../styles/pages/addDog.m.scss';

type Props = {
  match: Object,
  getDog(id): Promise,
  updateDog(vals): Promise,
  getAdmins: () => Promise,
  getLitters: () => Promise,
}

class DogEditPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      chip: '',
      name: '',
      instructor_id: '',
      litter_id: '',
      gender: 'M',
      dog: {
        instructor: {
          id: '',
          first_name: '',
          last_name: '',
        },
        litter: {
          id: '',
          name: '',
        },
      },
      admins: [],
      litters: [],
    };
    this.props.getDog(props.match.params.id)
      .then((dog) => {
        this.setState({
          chip: dog.chip,
          name: dog.name,
          instructor_id: dog.instructor.id,
          litter_id: dog.litter.id,
          gender: dog.gender,
          status: dog.status,
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
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
    this.updateStatus = this.updateStatus.bind(this);
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

  updateStatus(e) {
    this.setState({ status: e.target.value });
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
    this.props.updateDog(JSON.stringify(this.state.dog))
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
        <span styleName="my-class">Dog Edit Page</span>
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
                <Input type="select" name="gender" value={this.state.gender} onChange={this.updateGender}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <dt>Instructor</dt>
                <Input type="select" name="instructor" value={this.state.instructor_id} onChange={this.updateInstructor} >
                  {this.state.admins.map(admin => (
                    <option value={admin.id}>
                      {admin.first_name} {admin.last_name}
                    </option>))}
                </Input>
              </FormGroup>
              <FormGroup>
                <dt>Litter</dt>
                <Input type="select" name="litter" value={this.state.litter_id} onChange={this.updateLitter} >
                  {this.state.litters.map(litter => (
                    <option value={litter.id}>
                      {litter.name}
                    </option>))}
                </Input>
              </FormGroup>
              <FormGroup>
                <dt>Status</dt>
                <Input type="select" name="status" value={this.state.status} onChange={this.updateStatus} >
                  <option>
                    Active
                  </option>
                  <option value={false}>
                    Inactive
                  </option>
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
              <Link to={`/dogDetail/${this.state.id}`}>
                <Button outline="secondary" size="lg">BACK</Button>{' '}
              </Link>
              &nbsp;
              <Button color="secondary" size="lg">SAVE</Button>{' '}
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
  updateDog: vals => dispatch(upDateDog(vals)),
  getAdmins: () => dispatch(getAdmins()),
  getLitters: () => dispatch(getLitters()),
  getDog: id => dispatch(getDog(id)),
}))(DogEditPage);
// export default DogDetailPage;
