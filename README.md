# Diablo 4 Build Parser

A collection of Node.js scripts for parsing Diablo 4 build data from popular websites.

## Description

This project contains simple demonstration scripts that show how to extract Diablo 4 build information from various websites:

- `d4_build.js` - Extracts build data from d4builds.gg using their Firebase API
- `d4_tiers.js` - Scrapes tier list data from d4builds.gg using Cheerio
- `maxroll_tiers.js` - Extracts tier list data from maxroll.gg by parsing their JavaScript objects

## Installation

1. Clone this repository
2. Install dependencies:
```
npm install
```

## Usage

Run any of the sample scripts using Node.js:

```
node d4_build.js
node d4_tiers.js
node maxroll_tiers.js
```

Each script will output the parsed data to the console.

## Dependencies

- axios - HTTP client for making requests
- cheerio - jQuery-like HTML parsing library

## License

This project is for educational purposes only.