var express = require('express');
var router = express.Router();
const path =require('path')//this will give us the extention of file
const crypto = require('crypto')// this is used to generate rendom bits and later we convert them into hex(into readable form)
const multer=require('multer')
const uploads = multer({ dest: './uploads' })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    console.log("storage challa")
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log("storage file diya")
    crypto.randomBytes(12,function(err,buff){
      var fn= buff.toString("hex") + file.originalname;
      console.log(fn)
      cb(null, fn)
    })
  }
})
const upload = multer({ storage: storage })

router.post('/profile', upload.single('image'), function (req, res) {
  res.send("fuck you")
});

module.exports = router;
