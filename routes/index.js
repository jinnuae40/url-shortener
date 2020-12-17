var express = require('express');
var router = express.Router();

var shortUrl = require('node-url-shortener');
var apiCtrl = require('../controllers/api.js')

// get url from shorturl
// expect body {shortUrl: "XXX"}
router.get('/', async (req, res) => {
  try {
    var shortUrl = req.body.shortUrl
    var url = await apiCtrl.getURL(shortUrl)
    res.json({
      url
    })
  } catch (e) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
});

// create shorturl from url
// expect body {url: "XXX"}
router.post('/', async (req, res) => {
  try {
    var url = req.body.url
    shortUrl.short(url, async (err, shortUrl) => {
      if (err) {
        res.status(500).json({
          message: "Internal server error"
        })
      } else {
        var check = await apiCtrl.createURL(url, shortUrl)
        if (!check)
          res.status(403).json({
            message: "Shortened URL already registered"
          })
        else {
          res.status(200).json({
            shortUrl
          })
        }
      }
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
});

module.exports = router;