import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { API_ENDPOINT } = publicRuntimeConfig;

export const getSummonerMatches = async (name, region) => {
  const response = await fetch(`${API_ENDPOINT}?name=${name}&region=${region}`);
  if (!response.ok) {
    //Error occured
    throw Error(response.status);
  }
  return response.json();
};

export const getFudgedData = () => {
  return require('./sample.json');
};
