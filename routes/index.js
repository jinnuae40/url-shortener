var express = require('express');
var router = express.Router();

var shortUrl = require('node-url-shortener');
var apiCtrl = require('../controllers/api.js')

var mongoose = require('mongoose');


// get url from shorturl
// expect body {shortUrl: "XXX"}
router.get('/', async (req, res) => {
  try {
    var shortUrl = req.body.shortUrl
    if (!shortUrl) {
      res.status(400).json({
        message: "Please check the key. It should be 'shortUrl'"
      })
    } else {
      var url = await apiCtrl.getURL(shortUrl)
      res.json({
        url
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: "Internal Server Error"
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
          message: "Cannot create shortened URL"
        })
      } else {
        await apiCtrl.createURL(url, shortUrl)
        res.status(200).json({
          shortUrl
        })
      }
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
});

router.get('/health_check', async (req, res) => {
  if (mongoose.connection.readyState) {
    res.status(200).send("OK")
  } else {
    res.status(500).send("NOT OK")
  }
});

module.exports = router;