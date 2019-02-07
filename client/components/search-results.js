import React from 'react';

import MatchOverview from './match-overview';

const SearchResults = ({ error, matches }) => {
  return (
    <section
      css={`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      `}
    >
      {matches.map(m => (
        <MatchOverview key={m.gameId} match={m} />
      ))}
    </section>
  );
};

export default SearchResults;
