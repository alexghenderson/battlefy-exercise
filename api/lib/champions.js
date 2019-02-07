const dataDragon = require('./data-dragon');

module.exports = async id => {
  const champions = await dataDragon('champion.json');

  // TODO: strip out unneeded data from champions and create a map
  return champions;
};
