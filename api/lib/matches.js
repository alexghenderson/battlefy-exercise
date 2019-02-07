const axios = require('axios');
const getSpell = require('./spells');
const getChampion = require('./champions');
const getItem = require('./items');

const apiKey = process.env.LOL_API_KEY;

const getMatchByGameId = async (gameId, region = 'NA1') => {
  const response = await axios.get(
    `https://${region}.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}`
  );

  return response.data;
};

const getMatchSummary = async (match, perspective) => {
  const {accountId: perspectiveAccountId} = perspective;

  const participants = await Promise.all(
    match.participants.map(async p => ({
      participantId: p.participantId,
      team: p.teamId === 100 ? 'blue' : 'red',
      spells: [await getSpell(p.spell1Id), await getSpell(p.spell2Id)],
      champion: await getChampion(p.championId),
      level: p.stats.champLevel,
      kills: p.stats.kills,
      assists: p.stats.assits,
      deaths: p.stats.deaths,
      wards: p.stats.wardsPlaced,
      items: [
        // Array here doesn't preserve item spacing
        await getItem(p.stats.item0),
        await getItem(p.stats.item1),
        await getItem(p.stats.item2),
        await getItem(p.stats.item3),
        await getItem(p.stats.item4),
        await getItem(p.stats.item5),
        await getItem(p.stats.item6),
      ],
      creepScore: p.stats.totalMinionsKilled,
      masteries: {
        // TODO: (maybe?) - get details of masteries
        // this should be enough for displaying images though
        keystone: p.stats.perk0,
        primary: [p.stats.perk1, p.stats.perk2, p.stats.perk3],
        secondary: [p.stats.perk4, p.stats.perk5],
      },
    }))
  );

  const players = match.participantIdentities.map(identity => ({
    data: participants.find(p => p.participantId == identity.participantId),
    accountId: identity.player.currentAccountId,
    name: identity.player.summonerName,
    profileIcon: identity.player.profileIcon,
  }));

  const teams = match.teams.map(t => ({
    color: t.teamId === 100 ? 'blue' : 'red',
    victory: t.win === 'Win' ? true : false,
    players: players.filter(
      p => p.data.team === (t.teamId === 100 ? 'blue' : 'red')
    ),
  }));

  return {
    gameId: match.gameId,
    duration: match.gameDuration,
    teams,
    players,
    perspective:
      players.find(p => p.accountId === perspectiveAccountId) || null,
  };
};

module.exports = {
  getMatchByGameId,
  getMatchSummary,
};
