const dataDragon = require('./data-dragon');

module.exports = async id => {
  const champions = await dataDragon('champion.json');

  const map = Object.values(champions).reduce(
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
