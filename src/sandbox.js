const makeAPICall = (url, method = "GET", data = {}) => {
  const params = {
    headers: {
      "content-type": "application/json",
    },
    body: data,
    method,
  };

  const res = fetch(`${url}`, params);

  return res;
};

makeAPICall("/").then((res) => console.log(res));
