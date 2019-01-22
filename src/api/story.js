const HN_BASE_URL = 'https://hn.algolia.com/api/v1/search?query=';

var myInit = { method: 'GET' };

var myRequest = query => new Request(HN_BASE_URL + query, myInit);

const fetchStories = query =>
  fetch(myRequest(query))
    .then(response => response.json());

export {
  fetchStories,
};