const makeAPICall = (url, method = "GET", data = {}) => {
  const params = {
    headers: {
      "content-type": "application/json",
    },
    body: data,
    method,
  };

  return fetch(`${url}`, params);
};

makeAPICall("/").then((res) => console.log(res));
