var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var icecream_controller = require('../controllers/icecream');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// icecream ROUTES ///
// POST request for creating a icecream
router.post('/icecream', icecream_controller.icecream_create_post);

// DELETE request to delete icecream
router.delete('/icecream/:id', icecream_controller.icecream_delete);

// PUT request to update icecream.
router.put('/icecream/:id', icecream_controller.icecream_update_put);
// GET request for one icecream.
router.get('/icecream/:id', icecream_controller.icecream_detail);
// GET request for list of all icecream items.
router.get('/icecream', icecream_controller.icecream_list);

// A little function to check if we have an authorized user and continue on
// or
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
        return next();
    }
    res.redirect("/login");
}

/* GET update icecream page */
router.get('/update', secured,icecream_controller.icecream_update_Page);
router.get('/detail', secured,icecream_controller.icecream_detail);
router.get('/delete', secured,icecream_controller.icecream_delete_Page)

module.exports = router;
