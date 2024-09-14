const Menu = require('../models/menu.model');

// Obtener el menú
const getMenu = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const getMenuByRestaurantId = async (req, res) => {
    try {
        const { restaurantId } = req.query;
        const menu = await Menu.find({ restaurantId });
        res.status(200).json(menu);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


module.exports = {
    getMenu,
    getMenuByRestaurantId
    
};