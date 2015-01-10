"use strict";

var rest = require("restler"),
    cheerio = require("cheerio"),
    ent = require("ent"),
    _ = require("lodash");

function pad(n) {
  return ("00" + n).slice(-2);
}

function parsePage(body) {
  var $ = cheerio.load(body);

  var image = $("img").attr("src"),
      full = $("img").parent().attr("href"),
      explanation = $("body > p:first-of-type").html().trim();

  if (/^image/.test(image)) {
    image = "http://apod.nasa.gov/apod/" + image;
  }

  if (/^image/.test(full)) {
    full = "http://apod.nasa.gov/apod/" + full;
  }

  var title =
    $("body > center:nth-child(2) > b:nth-child(1)") ||
    $("body > p:nth-child(4) > b:nth-child(4)") ||
    { text: "" };

  title = title.text().trim();

  explanation = ent.decode(explanation);

  return {
    image: image,
    full: full,
    title: title,
    explanation: explanation
  };
}

function fetch(url, cb) {
  rest
    .get(url)
    .on("complete", function(result) {
      var parsed = parsePage(result);
      parsed.url = url;
      cb(null, parsed);
    });
}

module.exports = {
  latest: function(cb) {
    fetch("http://apod.nasa.gov/apod/astropix.html", cb);
  },

  forDate: function(arg1, arg2, arg3, cb) {
    var date = "";

    if (_.isDate(arg1)) {
      date = pad(arg1.getFullYear());
      date += pad(arg1.getMonth() + 1);
      date += pad(arg1.getDate());

      cb = arg2;
    }

    if (_.isString(arg1)) {
      date = arg1;
      cb = arg2;
    }

    if (_.isNumber(arg1)) {
      arg1 = pad(arg1);
      arg2 = pad(arg2 || 0);
      arg3 = pad(arg3 || 0);

      date = arg1 + arg2 + arg3;
    }

    if (!/^\d{6}$/.test(date)) {
      cb("No/invalid date provided", null);
      return;
    }

    fetch("http://apod.nasa.gov/apod/ap" + date + ".html", cb);
  },

  random: function(cb) {
    var start = new Date(1995, 5, 16),
        end = new Date(),
        current = start;

    var dates = [],
        date;

    while (current < end) {
      date = "";
      date = pad(current.getFullYear());
      date += pad(current.getMonth() + 1);
      date += pad(current.getDate());

      dates.push(date);

      current.setDate(current.getDate() + 1);
    }

    date = _.sample(dates);

    fetch("http://apod.nasa.gov/apod/ap" + date + ".html", cb);
  }
};
