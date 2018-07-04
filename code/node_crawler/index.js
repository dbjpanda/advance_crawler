// index.js
'use strict'

// load .env in local development
if (process.env.NODE_ENV !== 'development') {
  require('dotenv').config({ silent: true })
}

const processType = process.env.PROCESS_TYPE;

if (processType === 'scraper-api') {
  require('./scraper-api');
} else {
  throw new Error(`${processType} is an unsupported process type. Use : 'scraper-api'`);
}
