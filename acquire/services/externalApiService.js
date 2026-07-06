'use strict';

const axios = require('axios');
const https = require('https');

const KUNNA_API_URL = process.env.KUNNA_API_URL || 'https://openapi.kunna.es/data';
const KUNNA_TOKEN = process.env.KUNNA_TOKEN || '';
const KUNNA_ALIAS = process.env.KUNNA_ALIAS || '6339651';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});


async function fetchAndPrepareData() {
  try {
    const targetDate = new Date();

    const features = [
      120.5,
      118.3,
      115.2,
      targetDate.getHours(),
      targetDate.getDay(),
      targetDate.getMonth() + 1,
      targetDate.getDate()
    ];

    const timeEnd = new Date();
    const timeStart = new Date(timeEnd);
    timeStart.setDate(timeStart.getDate() - 3);

    return {
      rawData: [],
      features,
      targetDate,
      dailyValues: features.slice(0, 3),
      kunnaMeta: {
        alias: KUNNA_ALIAS,
        name: "1d"
      },
      daysUsed: [],
      fetchMeta: {
        timeStart: timeStart.toISOString(),
        timeEnd: timeEnd.toISOString()
      }
    };

  } catch (err) {
    console.error('[KUNNA] Error al obtener datos:', err.message);
    if (err.response) {
      console.error('[KUNNA] Response status:', err.response.status);
      console.error('[KUNNA] Response data:', JSON.stringify(err.response.data));
    }
    throw err;
  }
}

module.exports = {
  fetchAndPrepareData
};