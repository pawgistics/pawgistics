// @flow

import React from 'react';
import { Button as BootstrapButton } from 'reactstrap';

type Props = {
  label: string,
  handleClick: Function,
}

const Button = ({ label, handleClick }: Props) =>
  <BootstrapButton onClick={handleClick}>{label}</BootstrapButton>;

export default Button;
