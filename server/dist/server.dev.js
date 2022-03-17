"use strict";

var express = require("express");

var cors = require("cors");

var bodyParser = require("body-parser");

var SpotifyWebApi = require("spotify-web-api-node");

var _require = require("nodemon"),
    reset = _require.reset;

require("dotenv").config();

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.post("/refresh", function (req, res) {
  var refreshToken = req.params.refreshToken;
  var spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: refreshToken
  });
  spotifyApi.refreshAccessToken().then(function (data) {
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in
    });
  })["catch"](function (err) {
    return res.send(err);
  });
});
app.post("/login", function (req, res) {
  var code = req.body.code;
  var spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "7815c1f3863347b88bed977b67f40e0e",
    clientSecret: "29bcff74ee804f40adf7205df6b1f6a1"
  });
  spotifyApi.authorizationCodeGrant(code).then(function (data) {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    });
  })["catch"](function () {
    return res.sendStatus(400);
  });
});
app.listen(3001);