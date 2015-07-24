# apod.js

A small JS wrapper around [NASA's APOD API][api].

[api]: https://data.nasa.gov/developer/external/planetary/#apod

To use this, you'll need an api.data.gov API key - you can request one here: https://data.nasa.gov/developer/external/planetary/#apply-for-an-api-key

## Installation

    $ npm install apod

## Usage

```javascript
var apod = require("apod");

apod.apiKey = "YOUR_API_KEY";

function callback(err, data) {
  // do cool stuff with APOD data here
}

// get today's APOD
apod(callback);

// APOD for December 31, 1999 (JS has 0-indexed months)
apod(new Date(1999, 11, 31), callback);

// the same
apod(1999, 11, 31, callback);

// once more, with feeling
apod("December 31, 1999" callback);

// get a random APOD
apod.random(callback);
```

Assuming success, all methods trigger the callback with an object like the following, direct from NASA's API:

```json
{
  "concept_tags": true,
  "title": "The Millennium that Defined Earth",
  "url": "http://apod.nasa.gov/apod/image/9912/earthrise_apollo8.jpg",
  "explanation": "When the second millennium began, people generally knew that [...]",
  "concepts": {"0": "Galaxy", "1": "Milky Way", "2": "Earth", "3": "Solar System", "4": "Universe", "5": "Sun", "6": "Planet", "7": "Gravitation"},
  "date": "1999-12-31"
}
```

## HTTPS Proxy

Sending via an HTTP/HTTPS proxy is supported.
Just set the environment variable `https_proxy` and it will be used when making requests to the API.
Alternatively, set the `apod.proxy` string.

Here's examples of both usage patterns:

    $ https_proxy="https://my.secure.proxy" node script.js

```javascript
// script.js
apod.proxy = "https://my.secure.proxy"
```

## Version History

Version | Notes
------- | -----
0.2.0   | Add support for HTTPS proxy, refactors.
0.1.0   | Interface change, use new NASA APOD API
0.0.1   | Initial release

## License

MIT. For more details, see the `LICENSE` file.
