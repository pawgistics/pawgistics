// @flow

import _ from 'lodash';
import React from 'react';
import { Row, Col, Button, Form } from 'reactstrap';

import ImageDropzone from '../components/image-dropzone';

import { UIConsumer } from '../util/ui';

type Props = {
  history: Object,
  entityName: string,
  editFields: func;
  createEnt(entity): Promise,
  showAlert(color, text): void,
}

class AddPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      entity: {
        active: true,
        uri: `https://canine-assistants-assets.s3.amazonaws.com/${this.props.entityName}/default.jpg`,
        new_img: '',
      },
    };

    this.updateEntState = this.updateEntState.bind(this);

    this.saveEnt = this.saveEnt.bind(this);
  }

  updateEntState(update) { this.setState({ entity: { ...this.state.entity, ...update } }); }

  saveEnt() {
    this.props.createEnt(this.state.entity)
      .then(() => {
        this.props.showAlert('success', `${_.capitalize(this.props.entityName)} created successfully.`);
      }).catch((err) => {
        this.props.showAlert('danger', err.message);
      });
  }

  render() {
    const EditFields = this.props.editFields;
    return (
      <>
        <span className="title-text">Add {_.capitalize(this.props.entityName)}</span>
        <Form>
          <Row noGutters>
            <Col className="d-flex mb-3 mr-4 align-items-center" xs="12" sm="auto">
              <div className="mx-auto">
                <ImageDropzone
                  onChange={(update) => { this.updateEntState(update); }}
                  value={this.state.entity.new_img}
                  defaultValue={this.state.entity.uri}
                />
              </div>
            </Col>
            <Col className="mb-3" xs="12" sm="" xl="8">
              <EditFields
                onChange={(update) => { this.updateEntState(update); }}
                value={this.state.entity}
              />
            </Col>
          </Row>
        </Form>
        <Row noGutters className="justify-content-center">
          <Col xs="" sm="auto" className="mr-2 mx-sm-2">
            <Button block outline size="lg" onClick={this.props.history.goBack}>Back</Button>
          </Col>
          <Col xs="" sm="auto" className="ml-2 mx-sm-2">
            <Button block size="lg" onClick={this.saveEnt}>Create</Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default props => (
  <UIConsumer>
    {({ showAlert }) => (
      <AddPage
        showAlert={showAlert}
        {...props}
      />
    )}
  </UIConsumer>
);
