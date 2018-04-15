// const router = require('express').Router();

// const request = require('request');
// const cheerio = require('cheerio');
// const db = require('../models');

// router.get('/scrape', (req, res, next) => {
//   res.send(200);
//   // request('https://techcrunch.com/', (error, response, html) => {
//   //   const $ = cheerio.load(html);
//   //   const results = [];
//   //   $('div.l-main>ul>li>div.block').each((i, element) => {
//   //     const result = {
//   //       title: $(element).find('h2').text(),
//   //       link: $(element).find('h2').children('a').attr('href'),
//   //       summary: $(element).find('p').text(),
//   //     };
//   //     db.Article.updateOne({ title: result.title }, result, { upsert: true })
//   //       .then(() => {
//   //         res.json(results);
//   //       }).catch(next);
//   //   });
//   // });
// });

// module.exports = router;
