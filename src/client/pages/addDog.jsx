import React from 'react';
import CSSModules from 'react-css-modules';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Button } from 'reactstrap';

import styles from '../styles/pages/addDog.m.scss';

const AddDogPage = () => (
  <div>
    <span styleName="my-class">Add Dog Page  (Admin View)</span>
    <button className="btn btn-primary">Button</button>
    <Button color="primary">Button</Button>
  </div>
);

export default CSSModules(AddDogPage, styles);
// export default AddDogPage;
