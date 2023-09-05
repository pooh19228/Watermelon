const request = require("request");

const client_id = "53733938d57b41f19faac503890de97c";
const client_secret = "53ac4a687f604ece92fb2b11e7dc5e30";

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: "https://api.spotify.com/v1/users/jmperezperez",
      headers: {
        Authorization: "Bearer " + token,
      },
      json: true,
    };
    request.get(options, function (error, response, body) {
      console.log(body);
    });
  }
});
