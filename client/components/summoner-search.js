import React from 'react';

import SearchBar from './search-bar';
import SearchResults from './search-results';

import { getSummonerMatches } from '~/lib/api';

const SummonerSearch = () => {
  // Choosing to use hooks here
  // Personally find them cleaner then classes
  const [matches, setMatches] = React.useState([]);
  const [error, setError] = React.useState(null);
  const handleSearch = React.useCallback(async (name, region) => {
    try {
      const matches = await getSummonerMatches(name, region, true);
      setMatches(matches);
    } catch (err) {
      setMatches([]);
      setError(err);
    }
  });

  return (
    <div css={`
      display: flex;
      flex-direction: column;
    `}>
      <SearchBar onSearch={handleSearch} />
      <SearchResults error={error} matches={matches} />
    </div>
  );
};

export default SummonerSearch;
