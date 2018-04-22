// @flow

import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

import ResponsiveCols from '../components/responsive-cols';
import Select from '../components/select';
import AdminControl from '../containers/admin-control';

type Props = {
  onChange(): void,
  value: Object,
}

export default class UserEditFields extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePhoneNumber = this.updatePhoneNumber.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
    this.updateActive = this.updateActive.bind(this);
  }

  updateFirstName(e) { this.props.onChange({ first_name: e.target.value }); }
  updateLastName(e) { this.props.onChange({ last_name: e.target.value }); }
  updateEmail(e) { this.props.onChange({ email: e.target.value }); }
  updatePassword(e) {
    this.props.onChange({
      password: e.target.value,
      passChanged: true,
    });
  }
  updatePhoneNumber(e) { this.props.onChange({ phone_number: e.target.value }); }
  updateAdmin(value) { this.props.onChange({ admin: value }); }
  updateActive(value) { this.props.onChange({ active: value }); }

  render() {
    return (
      <ResponsiveCols equalWidth>
        <FormGroup>
          <Label for="first_name">First Name</Label>
          <Input type="text" id="first_name" autoComplete="given-name" placeholder="John" value={this.props.value.first_name || ''} onChange={this.updateFirstName} />
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Last Name</Label>
          <Input type="text" id="last_name" autoComplete="family-name" placeholder="Doe" value={this.props.value.last_name || ''} onChange={this.updateLastName} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" id="email" autoComplete="email" placeholder="user@canineassistants.com" value={this.props.value.email || ''} onChange={this.updateEmail} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" id="password" autoComplete="pass" placeholder="Unchanged" value={this.props.value.password || ''} onChange={this.updatePassword} />
        </FormGroup>
        <FormGroup>
          <Label for="phone_number">Phone #</Label>
          <Input type="text" id="phone_number" autoComplete="tel" placeholder="###-###-####" value={this.props.value.phone_number || ''} onChange={this.updatePhoneNumber} />
        </FormGroup>
        <AdminControl>
          <FormGroup>
            <Label for="user_type">User Type</Label>
            <Select
              inputId="user_type"
              options={[{ value: false, label: 'Volunteer' }, { value: true, label: 'Instructor' }]}
              onSelectValue={this.updateAdmin}
              isSearchable={false}
              value={this.props.value.admin}
            />
          </FormGroup>
        </AdminControl>
        <FormGroup>
          <Label for="status">Status</Label>
          <Select
            inputId="status"
            options={[{ value: true, label: 'Active' }, { value: false, label: 'Inactive' }]}
            onSelectValue={this.updateActive}
            isSearchable={false}
            value={this.props.value.active}
          />
        </FormGroup>
      </ResponsiveCols>
    );
  }
}
