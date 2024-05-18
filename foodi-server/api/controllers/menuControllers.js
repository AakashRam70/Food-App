const Menu = require("../models/Menu")

const getAllMenuItems = async (req, res) => {
    try {
        const menus = await Menu.find({}).sort({ createdAt: -1 });
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//post a new menu item
const postMenuItem = async (req, res) => {
    const newMenu = req.body;
    try {
        const result = await Menu.create(newMenu);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete a menu items
const deleteMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
        const deleteItem = await Menu.findByIdAndDelete(menuId);
        if (!deleteItem) {
            return res.status(404).json({ message: "Menu Not Found" })
        }
        res.status(200).json({ message: "Menu Item Deleted Successfully!" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get single menu item
const singleMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
        const menu = await Menu.findById(menuId);
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllMenuItems,
    postMenuItem,
    deleteMenuItem,
    singleMenuItem
}