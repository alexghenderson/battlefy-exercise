require('dotenv').config();
const config = require('./now.json');

const routes = config.routes.reduce(
  (r, route) => ({
    ...r,
    [route.src]: require(`./${route.dest}`),
  }),
  {}
);

const notFound = (_, res) => {
  res.statusCode = 404;
  res.end('Not found');
};

module.exports = async (req, res) => {
  const [url] = req.url.split('?');
  return (routes[url] || notFound)(req, res);
};
