// @flow

import _ from 'lodash';
import React from 'react';
import { Row, Col, Button, Form } from 'reactstrap';

import ImageDropzone from '../components/image-dropzone';

import { UIConsumer } from '../util/ui';

type Props = {
  match: Object,
  history: Object,
  entityName: string,
  editFields: func;
  getEnt(id): Promise,
  updateEnt(id, entity): Promise,
  removeEnt(id): Promise,
  showAlert(color, text): void,
  showConfirmation(text, action): void,
}

class EditPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      entity: {
        uri: '',
        new_img: '',
      },
    };

    this.updateEntState = this.updateEntState.bind(this);
    this.fetchEnt = this.fetchEnt.bind(this);
    this.fetchEnt();

    this.saveEnt = this.saveEnt.bind(this);
    this.removeEnt = this.removeEnt.bind(this);
  }

  updateEntState(update) { this.setState({ entity: { ...this.state.entity, ...update } }); }
  fetchEnt() {
    this.props.getEnt(this.state.id)
      .then((entity) => {
        this.updateEntState(entity);
      })
      .catch((err) => {
        this.props.showAlert('danger', err.message);
      });
  }

  saveEnt() {
    this.props.updateEnt(this.state.id, this.state.entity)
      .then(() => {
        this.props.showAlert('success', `${_.capitalize(this.props.entityName)} saved successfully.`);
      }).catch((err) => {
        this.props.showAlert('danger', err.message);
      });
  }

  removeEnt() {
    this.props.showConfirmation(
      `Are you sure you want to remove this ${this.props.entityName}? This operation cannot be undone.`,
      () => this.props.removeEnt(this.state.id)
        .then(() => {
          this.props.showAlert('success', `${_.capitalize(this.props.entityName)} removed successfully.`);
          this.props.history.replace(`/${this.props.entityName}s`);
        }).catch((err) => {
          this.props.showAlert('danger', err.message);
        }),
    );
  }

  render() {
    const EditFields = this.props.editFields;
    return (
      <>
        <span className="title-text">Edit {_.capitalize(this.props.entityName)}</span>
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
          <Col xs="" sm="auto" className="mr-2 mx-sm-2 mb-3 mb-sm-0">
            <Button block outline size="lg" onClick={this.props.history.goBack}>Back</Button>
          </Col>
          <Col xs="" sm="auto" className="ml-2 mx-sm-2 mb-3 mb-sm-0">
            <Button block size="lg" onClick={this.saveEnt}>Save</Button>
          </Col>
          <Col xs="12" sm="auto" className="mx-2">
            <Button block color="primary" size="lg" onClick={this.removeEnt}>Remove {_.capitalize(this.props.entityName)}</Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default props => (
  <UIConsumer>
    {({ showAlert, showConfirmation }) => (
      <EditPage
        showAlert={showAlert}
        showConfirmation={showConfirmation}
        {...props}
      />
    )}
  </UIConsumer>
);
