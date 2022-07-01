const { Router } = require('express');
const TA = require('../models/TA');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const tas = await TA.getAll();
    res.json(tas);
  } catch (e) {
    next(e);
  }
});
