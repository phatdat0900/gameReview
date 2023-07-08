const baseUrl = process.env.API_URL;
// const clientID = process.env.Client_ID;
// const auth = process.env.Authorization;
const key = process.env.RAWG;
const getUrl = (endpoint, params) => {
  if (typeof params === "object") {
    const qs = new URLSearchParams(params);
    return `${baseUrl}${endpoint}?${qs}&key=${key}`;
  }

  return `${baseUrl}${endpoint}?key=${key}`;
};

export default { getUrl };
