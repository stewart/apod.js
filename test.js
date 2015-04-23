"use strict";

var apod = require("./index.js");

if (!process.env.API_KEY) {
  throw new Error("No API_KEY env var set");
}

apod.apiKey = process.env.API_KEY;

function works(thing) {
  return thing ? "works" : "doesn't work";
}

apod(function(err, data) {
  if (err) {
    console.error(err);
    throw new Error("Error occured while testing apod()");
  }

  console.log("apod() ->", works(data.url));
});

apod(new Date(1999, 11, 31), function(err, data) {
  if (err) {
    console.error(err);
    throw new Error("Error occured while testing apod(Date)");
  }

  console.log("apod(Date) ->", works(data.url));
});

apod(1999, 11, 31, function(err, data) {
  if (err) {
    console.error(err);
    throw new Error("Error occured while testing apod(YYYY, MM, DD)");
  }

  console.log("apod(YYYY, MM, DD) ->", works(data.url));
});

apod("December 31, 1999", function(err, data) {
  if (err) {
    console.error(err);
    throw new Error("Error occured while testing apod(String)");
  }

  console.log("apod(String) ->", works(data.url));
});
