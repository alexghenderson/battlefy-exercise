import React from 'react';

import Input from './input';
import Button from './button';
import RegionSelect from './region-select';

import useField from '~/lib/use-field';

const SearchBar = ({ onSearch }) => {
  const name = useField('');
  const region = useField('NA1');

  const handleSearch = React.useCallback(() => {
    onSearch(name.field.value, region.field.value);
  }, [onSearch, name.field.value, region.field.value]);

  return (
    <div
      css={`
        display: flex;
      `}
    >
      <RegionSelect {...region.field} />
      <Input placeholder="Summoner Name" {...name.field} />
      <Button onClick={handleSearch}>Go</Button>
    </div>
  );
};

export default SearchBar;
