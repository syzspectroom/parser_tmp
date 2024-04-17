const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://d4builds.gg/tierlist/';

axios.get(url).then(response => {
  const html = response.data;
  const $ = cheerio.load(html);
  const tierLists = [];

  $('.tier__list').each((_, element) => {
    const tierName = $(element).find('.tier__list__category').text();
    const builds = [];

    $(element).find('.tier__list__item').each((_, item) => {
      const buildName = $(item).text().trim();
      if (buildName) { 
        builds.push(buildName);
      }
    });

    tierLists.push({
      tier: tierName,
      elements: builds
    });
  });

  console.log(tierLists);
}).catch(error => {
  console.error(`Error fetching the URL: ${error.message}`);
});
