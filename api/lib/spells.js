const dataDragon = require('./data-dragon');

module.exports = async id => {
  const spells = await dataDragon('summoner.json');
  const map = Object.values(spells).reduce(
    (prev, cur) => ({
      ...prev,
      [cur.key]: {
        name: cur.name,
        image: cur.image.full,
        key: cur.key,
      },
    }),
    {}
  );
  
  return map[id.toString()];
};
