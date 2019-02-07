const dataDragon = require('./data-dragon');

module.exports = async id => {
  const items = await dataDragon('item.json');

  const item = items[id.toString()];
  return item
    ? {name: item.name, image: item.image.full, key: id.toString()}
    : null;
};
