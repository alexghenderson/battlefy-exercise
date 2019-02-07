import React from 'react';

import MainTemplate from '~/templates/main';

import SummonerSearch from '~/components/summoner-search';

const IndexPage = () => {
  return (
    <MainTemplate title="League Summoner Stats">
      <SummonerSearch />
    </MainTemplate>
  );
};

export default IndexPage;
