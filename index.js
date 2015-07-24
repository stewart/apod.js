"use strict";

var superagent = require("superagent");

var endpoint = "https://api.data.gov/nasa/planetary/apod",
    proxyConfigured = false;

function quit(reason) {
  throw new Error(reason);
}

function getDate(arr) {
  if (!arr.length) { return new Date(); }
  switch (typeof arr[0]) {
    case "string":
      return new Date(arr[0]);

    case "number":
      // this sucks, the alternatives are worse
      return new Date(arr.join("-"));

    default:
      if (arr[0] instanceof Date) {
        return arr[0];
      }

      quit("Unknown arguments provided to apod()");
  }
}

// anytime between start of APOD and now
function randomDate() {
  var start = new Date(1995, 5, 16),
      end = new Date(),
      current = start,
      dates = [];

  while (current < end) {
    dates.push([
      current.getFullYear(),
      current.getMonth() + 1,
      current.getDate()
    ].join("-"));

    current.setDate(current.getDate() + 1);
  }

  return dates[Math.floor(Math.random() * dates.length)];
}

var apod = module.exports = function apod() {
  var args = [].slice.call(arguments);

  var callback = args.pop(),
      date = getDate(args);

  if (!callback || typeof callback !== "function") {
    quit("No callback provided to apod()");
  }

  if (!apod.apiKey) {
    quit("No API key set");
  }

  date = [
    date.getFullYear(),
    date.getMonth() + 1, // javascript
    date.getDate()
  ].join("-");

  var proxy = process.env.https_proxy || apod.proxy;

  if (proxy && !proxyConfigured) {
    proxyConfigured = true;
    require("superagent-proxy")(superagent);
  }

  var params = { concept_tags: "True", api_key: apod.apiKey, date: date },
      req = superagent.get(endpoint).query(params);

  if (proxy) {
    req = req.proxy(proxy);
  }

  req.query()
    .end(function(err, res) {
      var body = res.body;

      if (err || !res.ok) {
        callback(body, null);
        return;
      }

      callback(null, body);
    });
};

apod.apiKey = null;
apod.proxy = "";

apod.random = function(callback) {
  if (!callback || typeof callback !== "function") {
    quit("No callback provided to apod#random()");
  }

  function handler(err, data) {
    if (err) {
      apod(randomDate(), handler);
      return;
    }

    callback(err, data);
  }

  apod(randomDate(), handler);
};
