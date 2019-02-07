import React from 'react';

import Input from './input';

const Select = Input.withComponent('select');

const RegionSelect = props => {
  return (
    <Select {...props}>
      <option value="NA1">NA1</option>
    </Select>
  );
};

export default RegionSelect;
