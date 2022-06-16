const { Router } = require('express');
const NinjaTurtle = require('../models/NinjaTurtle');

module.exports = Router().get('/', async (req, res) => {
  const turtles = await NinjaTurtle.getAll();
  res.json(turtles);
});
