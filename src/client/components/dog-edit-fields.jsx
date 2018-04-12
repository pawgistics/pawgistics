// @flow

import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import ResponsiveCols from '../components/responsive-cols';
import Select from '../components/select';
import InstructorSelect from '../containers/instructor-select';
import LitterSelect from '../containers/litter-select';

type Props = {
  onChange(): void,
  value: Object,
}

export default class DogEditFields extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.updateName = this.updateName.bind(this);
    this.updateChip = this.updateChip.bind(this);
    this.updateLitterId = this.updateLitterId.bind(this);
    this.updateInstructorId = this.updateInstructorId.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateActive = this.updateActive.bind(this);
  }

  updateName(e) { this.props.onChange({ name: e.target.value }); }
  updateChip(e) { this.props.onChange({ chip: e.target.value && +e.target.value }); }
  updateLitterId(value) { this.props.onChange({ litter_id: value }); }
  updateInstructorId(value) { this.props.onChange({ instructor_id: value }); }
  updateGender(value) { this.props.onChange({ gender: value }); }
  updateActive(value) { this.props.onChange({ active: value }); }

  render() {
    return (
      <ResponsiveCols equalWidth>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" id="name" placeholder="Spots" value={this.props.value.name || ''} onChange={this.updateName} />
        </FormGroup>
        <FormGroup>
          <Label for="litter">Litter</Label>
          <LitterSelect
            inputId="litter"
            value={this.props.value.litter_id}
            onSelectValue={this.updateLitterId}
          />
        </FormGroup>
        <FormGroup>
          <Label for="chip_id">Chip ID</Label>
          <Input type="number" id="chip_id" placeholder="123456789" value={this.props.value.chip || ''} onChange={this.updateChip} />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Select
            inputId="gender"
            options={[{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }]}
            value={this.props.value.gender}
            onSelectValue={this.updateGender}
            isSearchable={false}
          />
        </FormGroup>
        <FormGroup>
          <Label for="instructor">Instructor</Label>
          <InstructorSelect
            inputId="instructor"
            value={this.props.value.instructor_id}
            onSelectValue={this.updateInstructorId}
          />
        </FormGroup>
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
