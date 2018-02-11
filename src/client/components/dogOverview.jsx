import React from 'react';
import PropTypes from 'prop-types';

class DogOverview extends React.Component {
  constructor(props) {
    super(props);
    this.uri = { uri: this.props.uri };
  }

  render() {
    return (
      <p>ayyyy</p>
    );
  }
}

DogOverview.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default DogOverview;
