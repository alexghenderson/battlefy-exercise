const {inspect} = require('util');
const queryString = require('query-string');

const {getSummonerByName, getSummonerMatches} = require('./lib/summoners');
const {getMatchByGameId, getMatchSummary} = require('./lib/matches');

const nameExpression = /^[\d\w _.]+$/;
const debug = process.env.NODE_ENV === 'development';

module.exports = async (req, res) => {
  const [, search] = req.url.split('?');
  const {name, region} = queryString.parse(search);

  if (name && nameExpression.test(name)) {
    // Name is valid - attempt to find summoner
    try {
      const summoner = await getSummonerByName(name, region);
      const matches = await getSummonerMatches(summoner, region);

      // Only show top 3 matches due to rate limiting
      // Future changes could involve saving matches in a db
      const topFive = matches.splice(0, 3);

      const summaries = await Promise.all(
        topFive.map(async match => {
          const details = await getMatchByGameId(match.gameId);
          return await getMatchSummary(details, summoner);
        })
      );
      return res.end(JSON.stringify(summaries));
    } catch (err) {
      // TODO: Verify axios uses error.statusCode for the response code
      if (err && err.statusCode && err.statusCode === 404) {
        res.statusCode = 404;
        return res.end('Summoner not found');
      }

      res.statusCode = 500;ß
      return res.end(inspect(err));
    }
  } else {
    // Name is invalid
    res.statusCode = 400;
    return res.end(`Invalid name "${name}"`);
  }
};
