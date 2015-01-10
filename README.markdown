# apod

A Node.JS module to let you grab any [Astronomy Picture Of the Day][apod].

[apod]: http://apod.nasa.gov/apod/astropix.html

## Installation

    $ npm install apod

## Usage

```javascript
var apod = require("apod");

var callback = function(err, data) {
  // do cool things with APOD here
};

apod.latest(callback);

// takes a String, a Date object, or Number Year/Month/Day as arguments
apod.forDate(2015, 01, 02, callback);
apod.forDate(new Date(), callback);
apod.forDate("20150102", callback);

apod.random(callback);
```

All functions yield an object like the following:

```javascript
{
  image: "http://apod.nasa.gov/apod/image/1501/m16pillarsHSTvis1024.jpg",
  full: "http://apod.nasa.gov/apod/image/1501/hs-2015-01m16pillarsHST.jpg",
  title: "Hubble 25th Anniversary: Pillars of Creation",
  explanation: " <a href=\"http://hubblesite.org/newscenter/archive/releases/2015/01/\">To celebrate 25 years</a> (1990-2015) of exploring the Universe from low Earth orbit [etc]",
  url: "http://apod.nasa.gov/apod/ap150101.html"
}
```

Although it should be noted that `#forDate` may return `null` if called with a date for which there is no picture.

## License

MIT. For more details, see the `LICENSE` file.
