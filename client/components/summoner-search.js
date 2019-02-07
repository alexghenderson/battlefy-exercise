import React from 'react';

import SearchBar from './search-bar';
import SearchResults from './search-results';

import { getSummonerMatches, getFudgedData } from '~/lib/api';

const SummonerSearch = () => {
  // Choosing to use hooks here
  // Personally find them cleaner then classes
  const [matches, setMatches] = React.useState([]);
  const [error, setError] = React.useState(null);
  const handleSearch = React.useCallback(async (name, region) => {
    // Use fudged data in case the api failed (probably due to api key issue)
    setMatches(getFudgedData());
    try {
      const matches = await getSummonerMatches(name, region);
      setMatches(matches);
    } catch (err) {
    }
  });

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
      `}
    >
      <SearchBar onSearch={handleSearch} />
      <SearchResults error={error} matches={matches} />
    </div>
  );
};

export default SummonerSearch;
