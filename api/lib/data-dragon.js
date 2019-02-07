const axios = require('axios');
const NodeCache = require('node-cache');

const url = process.env.DATA_DRAGON_BASE;

const cache = new NodeCache();

module.exports = async (endpoint) => {
  const cached = cache.get(endpoint);
  
  if(!cached) {
    const response = await axios.get(`${url}/${endpoint}`);
    cache.set(endpoint, response.data);
    return response.data.data;
  } else {
    return cached.data;
  }
}