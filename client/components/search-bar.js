import React from 'react';

import Input from './input';
import useField from '~/lib/use-field';

const SearchBar = ({ onSearch }) => {
  const search = useField('');
  return <Input {...search.field} />;
};

export default SearchBar;
