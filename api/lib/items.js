const dataDragon = require('./data-dragon');

module.exports = async id => {
  const items = await dataDragon('item.json');

  // TODO: strip out unneeded data
  return items;
};
