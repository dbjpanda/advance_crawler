const express = require('express');
const Nightmare = require('nightmare')
const { getLinks, appendInnerPage } = require('../common.js');
const router = express.Router();

const config = {
  show: process.env.NIGHTMARE_SHOW  === "true" || false,
  webPreferences: {
    images: process.env.NIGHTMARE_IMAGES  === "true" || false,
  }
}

// Get Dynamic Route
router.post('/get-dynamic', async (req, res) => {

  let url = req.body.url;
  let {context, link_selector: linkSelector, inner_page_selector: innerPageSelector, break_in_parts: breakInParts, no_of_parts: noOfParts, left_html: leftHtml, inner_feeds_scraper: innerFeedsScraper, base_url: baseUrl} = req.body.options;

  let results = {
    'status': '',
    'response': {},
    'error': {},
    'left': '',
    'leftHtml': ''
  };

  try {
    // For Remaining HTML content
    if (breakInParts && leftHtml != "") {
      results.response.body = leftHtml;
    } else { // For first time
      console.log("Fetching");
      let nightmare = Nightmare(config);
      await nightmare
        .goto(url)
        .wait('body')
        .evaluate(() => document.querySelector('body').innerHTML)
        .end()
      .then(async (response) => {
        results.response.body = response;
      }).catch(err => {
        console.log(err);
      });
    }

    links = getLinks(results.response.body, context, linkSelector, breakInParts, noOfParts,baseUrl);
    console.log(links);
    // Inner Fetching Check
    if (innerFeedsScraper) {
      // If enabled inner fetching
      let body = [];
      await Promise.all(links.map(async url => {
        let nightmare = Nightmare(config);
        await nightmare.goto(url)
          .wait('body')
          .evaluate(() => document.querySelector('body').innerHTML)
          .then((response) => {
            body.push(response);
            return nightmare.end();
          }).catch(err => {
            console.log(err.details);
            return nightmare.end();
          });
      }));
      // Append Inner Page in context
      [results.response.body, results.leftHtml, results.left] = appendInnerPage(results.response.body, context, body, innerPageSelector, breakInParts, noOfParts);
    }
    // Set status to true if everything goes successfull.
    results.status = true;
    results.response.statusCode = 200;
  }
  catch(err) {
    // Set status to false if error occurs.
    results.status = false;
    results.error = err;
    console.log(err);
  }
  // Return the response in json
  res.send(JSON.stringify(results));
});

module.exports = router;
