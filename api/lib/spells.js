const dataDragon = require('./data-dragon');

module.exports = async id => {
  const spells = await dataDragon('champion.json');

  // TODO: strip out unneeded data from spells and create a map
  return spells;
};
