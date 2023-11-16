var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('icecream', { title: 'Search Results icecream' });
});

var express = require('express');
const icecream_controlers= require('../controllers/icecream');
var router = express.Router();
/* GET icecream */
router.get('/', icecream_controlers.icecream_view_all_Page );
module.exports = router;
//icecream_update_put
module.exports = router;
/* GET detail icecream page */
router.get('/detail', icecream_controlers.icecream_view_one_Page);
/* GET create icecream page */
router.get('/create', icecream_controlers.icecream_create_Page);
/* GET create update page */
router.get('/update', icecream_controlers.icecream_update_Page);

/* GET delete icecream page */
router.get('/delete', icecream_controlers.icecream_delete_Page);
