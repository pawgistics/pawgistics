// @flow

import React from 'react';
import { FormText } from 'reactstrap';
import Dropzone from 'react-dropzone';

import '../styles/pages/image-dropzone.m.scss';

type Props = {
  onChange(): void,
  value: string,
  defaultValue: string,
}

export default class ImageDropzone extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      hovering_img: false,
    };

    this.updateImage = this.updateImage.bind(this);
  }

  updateImage(files) {
    this.setState({ hovering_img: false });
    const reader = new FileReader();
    const file = files[0];
    reader.onload = upload => this.props.onChange({ new_img: upload.target.result });
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <>
        <Dropzone
          styleName={`dropzone${this.state.hovering_img ? ' hover' : ''}`}
          onDrop={this.updateImage}
          onDragEnter={() => this.setState({ hovering_img: true })}
          onDragLeave={() => this.setState({ hovering_img: false })}
        >
          <div
            styleName="overlay-img"
            style={{ backgroundImage: `url(${this.props.value || this.props.defaultValue})` }}
            className="profile-img"
          />
        </Dropzone>
        <FormText styleName="help-text">
          Drop an image in the space above, or click it to select images to upload.
        </FormText>
      </>
    );
  }
}
