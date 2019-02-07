const axios = require('axios');

const apiKey = process.env.LOL_API_KEY;

const getSummonerByName = async (name, region = 'NA1') => {
  const response = await axios.get(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`
  );
  return response.data;
};

const getSummonerMatches = async (summoner, region = 'NA1') => {
  const {accountId} = summoner;
  const response = await axios.get(
    `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${apiKey}`
  );
  return response.data.matches;
};

module.exports = {
  getSummonerByName,
  getSummonerMatches,
};
