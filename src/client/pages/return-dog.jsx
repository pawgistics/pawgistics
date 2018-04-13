// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Label, Form, Col, FormGroup, Input, Button } from 'reactstrap';

import { getDogs } from '../api/volunteer';

class ReturnDogPage extends React.Component<Props> {
  // eslint-disable-next-line no-useless-constructor
  render() {
    return (
      <>
        <span className="title-text">Return Dog</span>
        {/* <button className="btn btn-primary">Back</button>
        <Button color="primary">Save</Button> */}
        <Form>
          <br />
          <FormGroup row>
            <br />
            <Label for="dogName" sm={2}>Dog Name:</Label>
            <Col sm={8}>
              <Input type="name" name="name" id="dogName" placeholder="Snoopy" />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="userName" sm={2}>Volunteer Name:</Label>
            <Col sm={8}>
              <Input type="name" name="name" id="userName" placeholder="Mel" />
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>1. Was the dog comfortable with bathing?</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  YES - Hopped right in with no hesitation.
                </Label>
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  SORT OF - Used treats and dogs were fidgety.
                </Label>
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  NO - Had trouble getting in or staying in.
                </Label>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleText" sm={3}>Please explain:</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>2. Was the dog comfortable drying?</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  YES - Hopped right on table and did not try to leave.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  SORT OF - Used treats and dogs were fidgety.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  NO - Had trouble getting in and staying on table.
                </Label>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={3}>Please explain:</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>3. How did the dog enter the car?</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  YES - Got right in.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  SORT OF - Hesitated and took a while.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  NO - Had to be lifted into the car.
                </Label>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={3}>Please explain:</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>4. How did the dog do while in the car?</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  YES - Settled nicely.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  SORT OF - Needed a distraction (treat/toy/kong).
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  NO - Could not settle, distressed panting, hopping into front.
                </Label>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={3}>Please explain:</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>5. How was walking with the dog?</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  YES - Had loose leash the whole time.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  SORT OF - Had loose leash sometimes. <br />
                  <Input type="radio" name="radio2" />
                  SORT OF - Stalls or lags.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  NO - Pulls or dashes.
                </Label>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={3}>Please explain:</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>6. Did your dog check in?</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  YES - On the phone the whole time.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  SORT OF - Used treats but checked in.<br />
                  <Input type="radio" name="radio2" />
                  SORT OF - Kind of, rarely checked in with each other.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  NO - Dog did not look at me the whole time we were out.
                </Label>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={3}>Please explain:</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>7. Any potty accidents? (better hurry)</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  YES
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  NO
                </Label>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={3}>Please explain:</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>8. Was there anything that gave your dog a positive or negative reaction?</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  YES
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  NO
                </Label>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={3}>Please explain:</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>9. Please explain your home visit or outing (places visited
                and any major positive or negative events that occurred):
              </h5>
            </legend>
            <Col sm={10}>
              <Input type="textarea" name="text" id="exampleText" />
            </Col>
          </FormGroup>
          <br />

          <h2>BBCT Activities you worked on with this dog and how they did:</h2>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>Yes and No</h5>
            </legend>
            <Col sm={10}>
              <FormGroup row>
                <Label for="exampleText" sm={3}>What were the items presented?</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={3}>How the dogs did with the items.</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>Like Me</h5>
            </legend>
            <Col sm={10}>
              <FormGroup row>
                <Label for="exampleText" sm={3}>What were the actions or items presented?</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={3}>How the dogs did with the itmes/actions during the activity.</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>Ick</h5>
            </legend>
            <Col sm={10}>
              <FormGroup row>
                <Label for="exampleText" sm={3}>How you used this.</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>Numbers/Application</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  1) Presented the numbers one through five.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  2) Posted numbers one through five on wall, board, etc.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  3) Numbers one through five and said Bring me this many.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  4) Numbers one through five applications to the real world.
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>Letters/Application</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  1) Presented the letters A - E.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  2) Posted the letters A - E on wall, board, etc.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  3) Buttons and symbols.
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>Baby/Gentle</h5>
            </legend>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  Very gentle, not mouthy.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  Pretty gentle, a bit mouthy.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  Mouthy, hurts a bit.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio2" />
                  Very mouthy, hurts a lot.
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>Stages of walking and how the dog did?</h5>
            </legend>
            <Col sm={10}>
              <Input type="textarea" name="text" id="exampleText" />
            </Col>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-8">
              <h5>List any positive or negative reaction the dog had with other dogs or people.</h5>
            </legend>
            <Col sm={10}>
              <Input type="textarea" name="text" id="exampleText" />
            </Col>
          </FormGroup>

          <br />
          <br />
          <div className="footer">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button size="lg">Submit Form</Button>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default connect(null, dispatch => ({
  getDogs: () => dispatch(getDogs()),
}))(ReturnDogPage);
