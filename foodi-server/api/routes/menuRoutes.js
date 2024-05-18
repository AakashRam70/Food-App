const express = require("express");
const router = express.Router();
const Menu = require('../models/Menu');
const menuController = require('../controllers/menuControllers')

// Get all menu items form data 

router.get('/', menuController.getAllMenuItems)

//post a menu item
router.post('/', menuController.postMenuItem)

//delete menu items
router.delete('/:id', menuController.deleteMenuItem)

//get single menu item
router.get("/:id", menuController.singleMenuItem)

module.exports = router;