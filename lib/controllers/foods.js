const { Router } = require('express');
const Food = require('../models/Food');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const foods = await Food.getAll();
    res.json(foods);
  } catch (e) {
    next(e);
  }
});
