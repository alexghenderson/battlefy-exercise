const endpoint = process.env.API_ENDPOINT;

export const getSummonerMatches = async (name, region) => {
  const response = await fetch(`${endpoint}?name=${name}&region=${region}`);
  if (!response.ok) {
    //Error occured
    throw Error(response.status);
  }
  return response.json();
};
